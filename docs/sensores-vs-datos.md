# Qué dato entrega cada sensor (validación contra el equipo real)

> Objetivo: cruzar **cada dato/modelo que ofrece la plataforma** con **las variables que
> necesita** y **el sensor que las entrega**, para saber qué queda cubierto con el equipo
> y qué hay que confirmar o sumar. Base: propuesta de sensores del proyecto (aún **propuesta
> técnica**, no equipo físico existente). No hay datos reales todavía: el dashboard es DEMO.

## Conectividad (contexto)
Se usa **celular LTE-M / NB-IoT** (mejor cobertura rural que 4G LTE Cat-1). Son redes de
**bajo ancho de banda**, pero suficientes de sobra para telemetría: todos los datos de abajo
son **valores numéricos pequeños y periódicos** (no imágenes/video), así que la conectividad
no es una limitante para entregarlos.

## Set de sensores de la propuesta
Suelo multiprofundidad **15/30/60 cm** (humedad + T) · **T/HR de aire** · **pluviómetro** ·
**anemómetro** · **piranómetro** (radiación) · **mojado foliar** · (postcosecha) CO₂/COV.

## Tabla: dato/modelo → qué necesita → sensor → estado
Leyenda de estado: ✅ cubierto · 🟡 derivado/depende del modelo (no de un sensor) ·
⚠️ **a confirmar** que el equipo elegido lo trae.

| Dato / modelo | Variables que necesita | Sensor(es) que lo entregan | Estado |
|---|---|---|---|
| **Alerta de helada** (proyección de la mínima + hora) | T aire (serie), punto de rocío, viento, radiación | T/HR aire, anemómetro, piranómetro | ✅ con buen modelo de enfriamiento radiativo |
| **Umbral de daño por cultivo/variedad** | T aire + tabla fenológica | T aire (+ parámetros por cultivo = software) | ✅ |
| **Riego por humedad de suelo** (15/30/60) | Humedad volumétrica por profundidad + calibración por tipo de suelo | **Sonda de suelo multiprofundidad** | ⚠️ confirmar que el modelo trae la sonda (es el sensor clave del riego) |
| **Horas-Frío (<7,2 °C) + Porciones de Frío** | Serie horaria de T aire | T aire | ✅ (cálculo desde la serie) |
| **Grados-día + plaga por especie** | T diaria (máx/mín) + umbrales por especie | T aire (+ umbrales = software) | ✅ |
| **ET₀ (Penman-Monteith FAO-56)** | **T, HR, viento, radiación** (presión ≈ por altitud) | T/HR aire, anemómetro, piranómetro | ✅ **entregable** con el set (responde la duda de Luis) |
| **Balance hídrico** | ET₀ · Kc (cultivo) − lluvia − riego aplicado | ET₀ (arriba), pluviómetro; **riego aplicado** = dato de riego | ✅ lado clima · ⚠️ falta el dato de *riego aplicado* (manual o caudalímetro/válvula) |
| **Lluvia / acumulados** | Precipitación | Pluviómetro | ⚠️ confirmar que va en el equipo |
| **Radiación / fotoperiodo** | Irradiancia solar | Piranómetro | ⚠️ confirmar que va en el equipo |
| **Rosa de vientos** | Velocidad **y dirección** del viento | Anemómetro (velocidad) **+ veleta (dirección)** | ⚠️ **confirmar dirección**: muchos anemómetros dan solo velocidad |
| **Mojado foliar** (riesgo botrytis) | Duración de humedad en hoja | Sensor de mojado foliar | ⚠️ confirmar que va (no se deriva con precisión) |
| **Punto de rocío** | T + HR aire | T/HR aire | 🟡 derivado (no requiere sensor aparte) |
| **Mapa de cuarteles** | Coordenada de cada estación | GPS a bordo **o** coordenada configurada al instalar | ⚠️ definir: GPS del nodo o carga manual |
| **Alarmas / push / históricos / reportes** | — | Plataforma (software) | ✅ |
| **Atmósfera controlada (postcosecha)** | CO₂ / COV | Sensor CO₂/COV (módulo secundario) | ✅ (relegado a postcosecha) |

## Qué confirmar con Luis contra el equipo real
1. **Sonda de suelo multiprofundidad 15/30/60** incluida (es el sensor clave del riego).
2. **Anemómetro con dirección (veleta)** — sin dirección no hay rosa de vientos.
3. **Mojado foliar**, **pluviómetro** y **piranómetro** incluidos (habilitan botrytis, balance hídrico y ET₀/radiación).
4. **GPS** a bordo o coordenada manual para ubicar cada estación en el mapa.
5. **Dato de riego aplicado** (entrada manual o caudalímetro/válvula) para cerrar el balance hídrico.

## Respuesta directa a la pregunta de Luis ("¿la E.T. la entregamos?")
**Sí.** ET₀ (Penman-Monteith) se calcula con **temperatura + humedad + viento + radiación**,
que el set propuesto entrega (T/HR aire + anemómetro + piranómetro). Lo que conviene cerrar es
el **balance hídrico**, que además de ET₀ necesita **lluvia** (pluviómetro) y **riego aplicado**
(dato de riego). Todo lo "por cultivo" (Kc, umbrales, fenología) es parámetro de software, no sensor.

> Nota de método (cero invención): esta tabla describe **qué necesita cada modelo** y **qué cubre
> la propuesta de sensores**; no afirma lecturas reales. Confirmar contra la ficha del equipo
> elegido antes de comprometer cada dato con un cliente.
