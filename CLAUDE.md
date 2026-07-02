# CLAUDE.md — Contexto del proyecto

> Memoria persistente para sesiones de Claude Code. Léela al inicio de cada sesión.

## Qué es este proyecto
El repo se renombra de `comparador-planos` a **`luismartinez-saas-agricultura`**
(hazlo en GitHub → Settings → Rename; git y Pages siguen funcionando por
redirección automática). La carpeta local del autor es `C:\proyectos code\LM-SaaSAgricultura`
(antes `LM-SaaSLecturaLTE`) — el nombre de la carpeta local es independiente del repo.
El producto es una **plataforma agroclimática IoT (SaaS) para fruta de exportación**
(cerezo, palto, kiwi, arándano, uva, nogal): estación **celular (LTE-M/NB-IoT)** con sensores de
**suelo y clima**, más una **plataforma SaaS** (web + dashboard + app Android) con
**alerta de helada anticipada**, riego por humedad de suelo, horas-frío/grados-día,
ET₀, históricos, alarmas, mapa de cuarteles, recomendaciones y reportes.
> **Reposicionado el 2026-07-01** desde "monitor de calidad de aire" a estación
> agroclimática. El CO₂/COV quedó relegado a un módulo de **atmósfera controlada /
> cámara de guarda** (postcosecha). Datos del dashboard = **DEMO simulada** coherente
> (cerezos en Curicó, madrugada de helada). Regla dura vigente: **cero invención**
> (sin clientes/casos/cifras falsas).

- Repo GitHub: `eonspa/luismartinez-saas-agricultura` (antes `comparador-planos`)
- Sitio/dashboard públicos (tras el rename): https://eonspa.github.io/luismartinez-saas-agricultura/
- Idioma del producto y de la comunicación: **español (Chile)** — precios en **CLP**, teléfonos `+56`.

## Marca
- **Nombre definido: `Estrato`** (2026-07-01, elegido con el usuario). Se reemplazó `[Marca]`
  → `Estrato` en todo el material (web, dashboard, brochure, manifest, workflow `pages.yml`).
  Razón: *estrato* = nube **stratus** (clima) + **capas/estratos de suelo** 15/30/60 (agro) +
  **estratos geológicos** (minería) → nombre neutro que estira a otros rubros (ej. minería),
  no atado a "agro". (Se descartaron *Sensagro*/*Agroclima* por agro-encasillados.)
- **Antes de imprimir/registrar:** verificar **dominio `.cl`/`.com`** e **INAPI** (marca registrada).
  Sondeo web: *Nimbo* descartado (existe nimbo.earth, geoespacial) y *Cirro* saturado en tech;
  *Estrato* sin colisión evidente en agtech/software.
- Contactos comerciales siguen **placeholders** (`ventas@ejemplo.cl`, `+56 9 0000 0000`) →
  reemplazar cuando el usuario aporte correo/teléfono/dominio reales.
- ✅ **Logo/mark: "estratos"** (3 líneas diagonales, tipo corte geológico; tile verde→lima) —
  reemplazó las ondas en web/dashboard/brochure + `dashboard/icon.svg` y los 5 PNG regenerados
  (favicon/192/512/maskable/apple-touch). El `icon.svg` viejo era azul/morado (era "calidad de aire").

## Identidad visual (paleta agrícola)
> **Aclarada el 2026-07-01** (a pedido: "los colores son muy oscuros" → se eligió la variante
> "verde medio"). La paleta anterior casi-negra (`#0a140d`…) quedó obsoleta; toda está en variables
> `:root` de `web/`, `dashboard/` y `brochure/`, más las nav (`rgba(16,27,22,…)`).
- Fondo verde medio `#1a2c26` / bg2 `#213730` / paneles `#284139`–`#304d44`, líneas `#446056`.
- Marca verde-menta `#4fe0a2`, lima `#a3e635`, acento ámbar `#f59e0b`, celeste `#38bdf8`.
- Texto `#f0f7f2`, muted `#bcd0c7`. Logo = marca verde→lima con ondas.

## Estructura del repo
- `web/` — sitio de marketing (index.html). Se publica en GitHub Pages.
- `dashboard/` — plataforma SaaS (PWA: manifest + `sw.js`). Se publica en GitHub Pages.
- `app/` — app Android (Capacitor) que empaqueta el dashboard; build en `android.yml`.
- `mobile/`, `hardware/`, `example/` — firmware/ejemplos del nodo.
- `brochure/` — brochure comercial: `brochure.html` (fuente) → `Brochure-Marca.pdf` (8 págs A4).
- `.github/workflows/` — `pages.yml` (deploy web+dashboard desde **main**), `android.yml` (APK).

## Hardware
- Nodo **ESP32-S3** + módem **celular LTE-M / NB-IoT** (elegido con el socio Luis Martínez: mejor cobertura rural que el 4G LTE Cat-1), batería LiPo + panel
  solar (autonomía a validar en piloto), buffer local si cae la señal.
- Sensores (propuesta agroclimática): **suelo multiprofundidad 15/30/60 cm** (T + humedad),
  temp/HR aire, **pluviómetro**, **anemómetro**, **piranómetro** (radiación), punto de rocío,
  **mojado foliar**. Postcosecha: CO₂/COV (SGP30) para cámara (relegado).
- Placa base real Makerfabs (repo original `4G-LTE-CAT1-Air-Monitor`; se migra al modelo **LTE-M/NB-IoT**). El HW con estos
  sensores agro es **propuesta técnica, no equipo físico existente** todavía.
- Reporte por HTTP / MQTT(S) / API.
- **Dos modelos ofrecidos — el cliente elige UNO por campo y el dashboard se adapta a sus sensores** (perfiles
  `HW`/`hw()` + selector "Equipo" en `dashboard/index.html`; `PRODUCTS` con los 2 SKU en `web/`):
  - **Modelo A · Estación completa** (ESP32-S3, solar, todos los sensores) → helada, riego, horas-frío, GD, **ET₀**, rosa de vientos, lluvia.
  - **Modelo B · Nodo rugerizado** (STM32 **NORVI** IP67, batería no recargable **5–7 años** sin panel, celular LTE-M/NB-IoT/2G,
    entradas 2×4–20 mA + **RS-485/Modbus**; solo T aire + suelo 15/30/60) → helada, riego, horas-frío, GD; **oculta ET₀/viento/lluvia/radiación/mojado foliar**.
- **Conectividad = 100% nube, sin gateway ni WiFi**: cada estación celular va **directo a la nube** (el gateway LoRa quedó fuera).
  Sin servidor local; solo buffer en el propio equipo. **OpEx SIM real (Luis):** multioperador (Entel/Movistar/Claro), ~**USD 1,39–2,39/mes**
  (10–30 MB) o **USD 12/año** (240 MB); 15 MB basta → costo marginal ínfimo, margen SaaS alto.
- **Backend real aún NO construido** (todo el dashboard es DEMO): falta ingesta + base time-series + motor de alertas.

## Funcionalidades de la plataforma
**Alerta de helada** (proyección de mínima + hora + umbral por cultivo, anticipada) ·
Riego por **humedad de suelo** (15/30/60 cm) · **Horas-Frío (<7,2°C) + Porciones de Frío** ·
**Grados-día + plaga por cultivo** (Lobesia/uva, Drosophila/cereza-arándano, carpocapsa/nogal) ·
**ET₀ (Penman-Monteith)** y balance hídrico · Rosa de vientos y lluvia · Mapa de cuarteles ·
Recomendaciones por cultivo · Históricos/Reportes · Alarmas (push). Módulo secundario
**Atmósfera Controlada** (postcosecha).
**Roles multiempresa (6):** Super Admin, Admin de Cuenta, Supervisor de Campo,
Agrónomo/Analista, Técnico/Operador, Visor.

## Planes (referencia, CLP) — sin plan gratis
- **Piloto** — a medida, 1 campo · 1 estación · 1 temporada (prueba dirigida).
- **Producción** — $37.500/mes ref. (anual ~17% dto.), por campo, alertas ilimitadas, roles.
- **Multicampo / Empresa** — a medida, ilimitado, API + integración a certificación (GlobalGAP) + SLA.

## Flujo de trabajo (git) — IMPORTANTE
- Rama de desarrollo: `claude/4g-lte-air-monitor-integration-2f7fey`.
- Se **espeja también a `main`** (Pages despliega desde main). Patrón usado:
  `git push -u origin <rama>` y luego `git push origin HEAD:main`.
- Mensajes de commit **en español**, terminando con las líneas `Co-Authored-By:`
  y `Claude-Session:` indicadas por el harness.
- **No** incluir el identificador del modelo en commits, PRs, código ni artefactos.
- No crear PRs salvo que el usuario lo pida.

## Preferencias de interacción
- Responder **en español**, tono directo y conciso.
- Para material visual (web/dashboard/brochure): renderizar y **verificar con
  screenshots** (Playwright/Chromium en `/opt/pw-browsers/chromium`) antes de entregar.
- PDFs del brochure se generan con Chromium `page.pdf({format:'A4', printBackground:true, preferCSSPageSize:true})`.

## Contexto de sesión (actualizado 2026-07-01)
- **Reposicionamiento comercial EJECUTADO** (dashboard PR#7, web PR#8, brochure PR#9)
  hacia fruta de exportación con foco en **helada/riego/frío**. Benchmark previo de
  Wiseconn/Semios/Sencrop/CropX/Arable (vía WebSearch; el proxy bloquea el fetch directo).
- El sitio se sirve en GitHub Pages; **la URL raíz redirige a `/web/`** (`index.html`
  + `.nojekyll` en la raíz). El dashboard está **montado dentro** del área privada
  (login demo `@demo.cl`, primer ítem "Monitoreo en vivo").
- Flujo de publicación vigente: rama → **PR → merge a `main`** vía GitHub MCP
  (el push directo a `main` está bloqueado en la sesión; los push a la rama sí funcionan).
- **Próximos pasos sugeridos** (dónde quedamos, sin prioridad forzada):
  1. ✅ **HECHO** (web, esta rama): bloque **"Al nivel del cuartel, no del valle"** (por
     cuartel / por variedad, `#cuartel`) + sección/FAQ **"¿Por qué pagar si el Estado
     avisa gratis?"** (`#estado`) en la portada, y la misma pregunta corta en la FAQ de
     planes. De paso se corrigió la copia obsoleta de planes ("14 días · sin tarjeta" y
     la FAQ del plan "Starter/Pro gratis") para alinear con el "sin plan gratis".
  2. **Research dirigido** de los competidores que el proxy bloqueó (Wiseconn, Semios,
     Pessl/Metos, Sencrop, CropX) y el **pricing de Instacrops**.
  3. ✅ **HECHO — marca definida: `Estrato`** (reemplazado `[Marca]` en todo el material).
     Falta solo **contactos reales** y verificar **dominio/INAPI**. (Ver sección "Marca".)
  4. Falta replicar el énfasis "por cuartel/variedad" y el argumento vs. Estado en el
     **dashboard** y el **brochure** (hoy solo en la web de marketing).
  5. ✅ **HECHO — rediseño "anti-IA" de `web/index.html`** (a pedido: "que no parezca
     página creada con IA"). Basado en research de "tells" de IA (grillas de tarjetas con
     emoji, chip centrado sobre el H1, borde-izquierdo de color, franjas de stats). Cambios:
     **sistema de íconos SVG de línea propios** (objeto `ICONS`+`icon()`, sin emoji ni
     dependencias → sin copyright); **hero split** (copy editorial + panel de producto,
     sin chip ni stats); capacidades en **lista editorial 2-col** (no grilla); pasos con
     filete y numeración tabular; **cuartel** como split + **mini-mapa de cuarteles**; el
     "¿por qué pagar si el Estado…?" como **tabla comparativa** pública vs `Estrato`;
     `.callout` en vez de borde-izquierdo; se **eliminaron 2 secciones redundantes**
     (Casos de uso + "Lo que sí medimos"). Emoji reemplazados por íconos también en
     productos, ayuda, recursos, login (botones demo), nav (carrito), y el **área demo
     RBAC** (sidebar + badge de rol + recomendaciones). **Regla dura:** se quitó un
     **caso falso** en Recursos ("Caso: 18% menos agua… un cliente") por cero invención.
     Verificado con screenshots (desktop+móvil), sin errores de consola. (El trato de
     íconos/layout "anti-IA" del **dashboard standalone** y el **brochure** sigue pendiente.)
  6. ✅ **HECHO — mapa de dispositivos por campo** (dashboard, PR #15): pestaña **"Mapa"**
     con **Leaflet + OpenStreetMap/CARTO** auto-alojado en `dashboard/vendor/` (sin clave),
     selector de campo (`CAMPOS`), marcadores por estado de helada y popups. CSP abierta
     solo para `img-src` de tiles. Coordenadas DEMO cerca de Curicó. (Ver Pendientes técnicos.)
  7. ✅ **HECHO — limpieza de specs implausibles** (PR #14): fuera el rango de componente
     "−40…85 °C" del hero (absurdo para un huerto); autonomía del dashboard "≥7 días sin
     sol" → "(a validar en piloto)". Regla de cero invención.
  8. ✅ **HECHO — paleta "verde medio"** (PR #16, a pedido "los colores son muy oscuros"):
     recolor de `:root` en web/dashboard/brochure + nav armonizada + PDF del brochure
     regenerado. (Ver "Identidad visual".)
- **Pendientes vivos tras esta sesión** (PRs #13–#16 ya en `main`): (a) **brochure + dashboard
  standalone** — trato "anti-IA" de íconos/layout (el recolor ya está hecho); (b) **productos**
  — decidir si se suavizan specs de proveedor ("hasta 1 año / 5 km"); (c) ✅ **marca definida:
  `Estrato`** (reemplazada en todo el material) — falta solo **contactos reales** y verificar
  **dominio/INAPI**; (d) **README** desactualizado (describe el producto viejo de "calidad del
  aire", planes "Starter gratis", 4G, ThingSpeak) → alinear con el posicionamiento actual;
  (e) **conectividad NB-IoT/LTE-M** + `docs/sensores-vs-datos.md` ya en `main` (PR #18).

## Mercado / competencia (estudio 2026-07-01 → `docs/estudio-mercado.md`)
- **Competidor #1 en Chile: Instacrops** (agtech chilena) — ya hace **helada anticipada**
  (InstaFrost), suelo, riego y agentes IA por **WhatsApp**, modelo suscripción. Diferenciarse
  por **especialización en fruta de exportación + rigor agronómico** (horas-frío/porciones,
  ET₀, umbrales por cultivo/variedad, por **cuartel**, trazabilidad GlobalGAP).
- **Rival gratuito estructural: RAN-AGROMET** (Estado, 433 estaciones, alerta de helada gratis
  por SMS/email). Justificar el pago con **densidad por cuartel + dato del sitio + acción
  integrada** (no solo avisar). Sumar en la web una FAQ "¿por qué pagar si el Estado avisa gratis?".
- **Agurotech (NL)**: suelo FDR multiprofundidad + riego, pero helada **reactiva por umbral**
  (no predictiva) y sin Chile.
- **Pendiente de research** (proxy bloqueó sus webs): Wiseconn, Semios, Pessl/Metos, Sencrop,
  CropX, Phytech, Hortau — y el **pricing real de Instacrops** para calibrar el plan Producción.
- Regla: cifras de mercado = estimaciones de vendors; nada de datos no verificados como hechos.

## Pendientes técnicos abiertos
- **ThingSpeak / generador de firmware**: el dashboard viejo (lector ThingSpeak + comandos
  AT) se **retiró** en la reconstrucción agrícola (demo-only). Recuperable si se quiere
  ingestión real; al restaurarlo alinear el mapeo (`field3=TVOC,4=eCO₂,7=Luz,8=Bat`).
- **About del repo** (descripción + web + topics): pendiente; probablemente manual
  (no hay tool MCP para editarlo). Valores sugeridos ya redactados.
- **Decimales**: unificar a coma chilena (hay mezcla `−1,4` vs `8.1`).
- **Planes**: ✅ resuelto en web — la franja ahora dice "Sin permanencia · Precios en CLP ·
  Cancela cuando quieras · Soporte en español (Chile)" y la FAQ ya no ofrece "Starter/Pro gratis".
  Revisar que dashboard/brochure no arrastren la misma franja obsoleta.
- **Mapa de cuarteles**: ✅ **RESUELTO** — pestaña **"Mapa"** del dashboard con **Leaflet + OpenStreetMap/CARTO**
  (auto-alojado en `dashboard/vendor/leaflet.*`, **sin clave de API**), **selector de campo**, marcadores por
  dispositivo coloreados por estado de helada y popups con detalle. Coordenadas **DEMO** cerca de Curicó
  (`CAMPOS` en `dashboard/index.html`) → reemplazar por GPS real al instalar. La **CSP** se abrió solo para
  `img-src` de los tiles (`*.basemaps.cartocdn.com`, `*.tile.openstreetmap.org`); el resto sigue estricto.
  Se descartó Google Maps por requerir clave con facturación expuesta en el sitio público (Pages).

## Pendientes / ideas abiertas — BLOQUEANTES primero
- ✅ **MARCA — RESUELTA: `Estrato`** (reemplazado `[Marca]` en todo el material). Quedan solo
  **contactos reales** y **verificar dominio `.cl`/`.com` + INAPI** antes de imprimir/registrar.
- ✅ **Logo/mark**: hecho — mark de "estratos" (corte geológico) en todo el material y en los íconos PWA/favicon.
- **Hardware físico real** con sensores agro (suelo multiprofundidad, piranómetro, mojado foliar) y su firmware.
- **Datos de campo reales** (hoy todo DEMO): estación real → casos/ROI verificables.
- Fotos reales del hardware (el proxy bloquea makerfabs.com; el usuario las aportará).
- Umbrales configurables por cultivo/fenología; motor real de pronóstico de helada.
- Brochure **en inglés** / variante clara para imprimir; traducir plataforma interna al inglés.
- Checkout con Stripe real.
