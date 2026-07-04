# Arquitectura de escalamiento — backend Sembu

> **Estado (cero invención):** el backend real **aún no está construido**; el dashboard
> publicado es **DEMO simulado**. Este documento es el **plan de arquitectura objetivo**
> para pasar de demo a producción y sostener un modelo de **volumen** (muchos equipos,
> precios bajos). Nada acá describe un sistema en operación: es el diseño propuesto.

## Principios de diseño

1. **100% nube, sin servidor local.** Cada estación celular (LTE-M / NB-IoT) reporta
   **directo a la nube**. Sin gateway ni servidor en el campo. Lo único "local" es el
   **buffer en el propio equipo** (reenvía si se cae la señal).
2. **La telemetría es diminuta.** ~144 envíos/día por equipo, JSON de ~20–40 números.
   El costo de compute/red por equipo es ínfimo → el **costo de infra por equipo BAJA con
   la escala** (economía de escala que favorece el modelo de volumen).
3. **Criticidad = uptime.** La alerta de helada de madrugada **no puede fallar**. Por eso
   nube **managed con redundancia/backups**, no un fierro propio (punto único de falla).
4. **Barato por diseño.** Managed para no tener DBA; **push-first** en notificaciones;
   **compresión + downsample** del histórico; compute stateless que autoescala.

## Componentes del backend

| Componente | Qué hace | Tecnología recomendada | Cómo escala |
|---|---|---|---|
| **Ingesta** | Recibe la telemetría de cada equipo (HTTP/MQTT) y la valida | Endpoint stateless (FastAPI / Fastify) o serverless (Edge Functions / Cloudflare Workers). Broker **MQTT (EMQX)** opcional a escala | Horizontal / autoscale; la carga es baja y esporádica |
| **Base time-series** | Guarda las lecturas y sirve históricos | **Postgres + TimescaleDB** (compresión, retención, agregados continuos) | Compresión 10–20× · réplicas de lectura · particionado |
| **Motor de alertas** | Corre las reglas (proyección de helada, umbrales por cultivo, horas-frío, ET₀) y dispara avisos | Workers desacoplados detrás de una **cola** (Redis/RabbitMQ). Evaluación incremental al llegar el dato | Pool de workers escalable; dimensionar para el *peak* de madrugada |
| **API + Auth** | Expone datos al dashboard/app; multi-empresa | REST/GraphQL + JWT; **Postgres RLS** por organización | Stateless; cache de agregados |
| **Notificaciones** | Entrega la alerta al usuario | **Push (FCM) gratis** por defecto; **WhatsApp/SMS** (gateway) solo para helada crítica | Push escala gratis; WhatsApp/SMS con tope de costo |
| **Frontend / PWA** | El dashboard actual, conectado a la API real | Estático en CDN (ya existe) apuntando a la API | CDN; sin costo de compute |
| **Observabilidad** | Vigila que el sistema (y las alertas) funcionen | Logs + uptime + **meta-monitoreo** (si la ingesta se detiene, avisar a operaciones) | — |

## Stack por fase

- **Fase 0 · MVP (0–300 equipos)** — **Supabase** (Postgres + Auth + Edge Functions +
  Realtime) + un worker (cron) para las alertas + **FCM**. ~**USD 25/mes**. Objetivo:
  recibir y guardar datos reales de las primeras estaciones y conectar el dashboard.
- **Fase 1 · Crecimiento (300–3.000)** — DB managed dedicada (**Timescale Cloud** / RDS) +
  **cola** (Redis) + pool de workers + MQTT (EMQX) si hace falta. ~**USD 80–200/mes**.
- **Fase 2 · Escala (3.000–50.000+)** — Postgres+Timescale con **réplicas de lectura** +
  **particionado** + workers autoescalables + **EMQX en clúster** + CDN + alta
  disponibilidad. ~**USD 500–3.000/mes**.

## Proyección de infra (a validar con cotización real)

| Equipos | Infra cloud/mes | **Infra por equipo/mes** |
|---|---|---|
| 100 | ~USD 25 | ~CLP 240 |
| 1.000 | ~USD 80 | ~CLP 77 |
| 10.000 | ~USD 300–500 | ~CLP 30–50 |
| 50.000 | ~USD 1.500–3.000 | ~CLP 30–60 |

El costo de infra **por equipo cae** al crecer. Con planes bajos, el margen se sostiene
de sobra: a 10.000 equipos la infra cuesta ~CLP 40/equipo.

## Cuellos de botella (y cómo se resuelven)

1. **Peak de helada (*thundering herd*).** En una madrugada fría, casi todas las estaciones
   cruzan el umbral entre las 4 y 6 am → ráfaga de evaluaciones + notificaciones. **Mitigación:**
   desacoplar con **cola**; dimensionar los workers para esa **ventana** (no para el promedio);
   evaluar la proyección de mínima **incrementalmente** a medida que llega el dato, no todo junto.
2. **Fan-out de notificaciones = tu costo variable real.** WhatsApp/SMS cuestan por mensaje
   (USD 0,005–0,08) y tienen límites de tasa. **Mitigación:** **push (FCM) gratis por defecto**;
   WhatsApp/SMS **solo para helada crítica**, con batching, rate-limit y **tope de costo por
   cliente**. Así el costo de notificación no se dispara con el volumen.
3. **Histórico creciente.** Las escrituras se acumulan. **Mitigación:** **compresión** de
   Timescale (10–20×), **políticas de retención**, **agregados continuos** (downsample del
   histórico viejo a horario/diario) y **réplicas de lectura** para las consultas del dashboard.

## Multi-tenant, seguridad y respaldo

- **Aislamiento por empresa** con Postgres **RLS** (row-level security) — cada tenant ve solo lo suyo.
- **JWT** para auth; **TLS** en todo; gestión de secretos; principio de menor privilegio.
- **Backups** con point-in-time recovery; prueba de restauración periódica.

## Reglas para mantenerlo barato y sostenible

- **Managed DB** para no pagar un DBA ni operar fierros.
- **Push-first**; WhatsApp/SMS solo lo crítico y con tope.
- **Compute stateless** que autoescala; **compresión + downsample** del histórico.
- **Cache** de los agregados que muestra el dashboard (no recalcular en cada carga).
- Evitar **microservicios prematuros** — un monolito modular escala muchísimo antes de necesitarlos.

## Qué NO hacer (evitar over-engineering)

- **Nada de servidor por fundo** ni auto-hostear en fierro propio.
- **Nada de Kafka/Kubernetes/multi-cloud el día 1** — sobra con VPS/managed + cola simple.
- **No construyas tu propio Auth** — usa el del proveedor.
- **No hace falta infra de ML al inicio:** el pronóstico de helada puede ser un **modelo
  físico/estadístico** (enfriamiento radiativo) antes que un modelo entrenado.

## Roadmap de construcción (MVP primero)

1. **Ingesta + DB** — recibir y guardar datos reales de 1 estación piloto.
2. **API + Auth** — conectar el **dashboard existente** a datos reales (reemplazar el DEMO).
3. **Motor de alertas de helada** + **push (FCM)**.
4. **WhatsApp/SMS** para la alerta crítica.
5. **Multi-tenant + roles** (RLS).
6. **Históricos, reportes y API pública**.
7. **Escalar** (cola, réplicas, particionado) **cuando el volumen lo pida**, no antes.

> Nota de conectividad: la SIM multioperador (LTE-M/NB-IoT) y su OpEx (~USD 1,4–2,4/mes o
> USD 12/año por equipo) están cubiertos en `CLAUDE.md`. El **costo marginal por equipo**
> (SIM + notificaciones + fracción de infra) es de unos pocos miles de pesos al mes, lo que
> sostiene el modelo de precios bajos y volumen.
