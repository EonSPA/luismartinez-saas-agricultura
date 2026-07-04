# Sembu — Plataforma agroclimática IoT

Plataforma **IoT + SaaS** para **fruta de exportación** (cerezo, palto, kiwi,
arándano, uva, nogal). Estación **celular (LTE-M / NB-IoT)** con sensores de
**suelo y clima**, y una plataforma web + dashboard + app Android con **alerta de
helada anticipada, riego por humedad de suelo, horas-frío, grados-día, ET₀,
históricos, alarmas, mapa de cuarteles y reportes**.

> 🔗 **Sitio:** https://eonspa.github.io/luismartinez-saas-agricultura/
> 🔗 **Plataforma (dashboard):** https://eonspa.github.io/luismartinez-saas-agricultura/dashboard/
> 📱 **App Android (APK):** ver [Releases](../../releases)

*Marca comercial: **Sembu** (adoptada 2026-07-02; dominio `sembu.cl` disponible e INAPI sin colisión, pendiente registrar).*

> **Nota:** el dashboard publicado usa **datos DEMO simulados** (cerezos en Curicó,
> madrugada de helada) para ilustrar el producto. El backend real de ingesta +
> base time-series + motor de alertas está **en desarrollo**. Regla del proyecto:
> **cero invención** (sin clientes, casos ni cifras falsas).

---

## ¿Qué hace?

- **Alerta de helada anticipada** — proyección de la mínima, hora estimada y umbral de daño **por cultivo y variedad**, para activar aspersión o calefacción a tiempo.
- **Riego por humedad de suelo** — sondas a **15/30/60 cm** y agua aprovechable para regar por dato real, no por calendario.
- **Horas-Frío (<7,2 °C) y Porciones de Frío** — acumulación de frío para anticipar brotación y floración.
- **Grados-día + plaga por especie** — Lobesia (uva), Drosophila (cereza/arándano), carpocapsa (nogal).
- **ET₀ (Penman-Monteith) y balance hídrico** — evapotranspiración a partir de T, HR, viento y radiación.
- **Rosa de vientos y lluvia · Mapa de cuarteles** — estado por sector y ficha de cada estación.
- **Recomendaciones, históricos y reportes** — informes en PDF/Excel y alarmas con push.
- **Atmósfera controlada (postcosecha)** — módulo secundario para cámara de guarda (CO₂/COV).
- **Roles multiempresa** — Super Admin, Admin de Cuenta, Supervisor de Campo, Agrónomo/Analista, Técnico/Operador y Visor.

## Cultivos

Cerezo · Palto · Kiwi · Arándano · Uva · Nogal — con umbrales de helada y
acumulación de frío distintos por especie y fenología, configurables por cuartel.

## Estructura del repo

| Carpeta | Contenido |
|---|---|
| `web/` | Sitio de marketing (se publica en GitHub Pages). |
| `dashboard/` | Plataforma SaaS como PWA (manifest + service worker). |
| `app/` | App Android (Capacitor) que empaqueta el dashboard. CI en `.github/workflows/android.yml`. |
| `mobile/` | Mockups de la app móvil. |
| `hardware/` | Planos y referencia de firmware del nodo. |
| `brochure/` | Brochure comercial en PDF (`brochure.html` → `Brochure-Marca.pdf`). |
| `example/` | Firmware del hardware base (Makerfabs) — referencia/legado. |
| `docs/` | Estudio de mercado, mapeo sensor→dato y arquitectura de escalamiento. |

## Hardware

Se ofrecen **dos modelos** (el cliente elige uno por campo; el dashboard se
adapta a sus sensores):

- **Modelo A · Estación completa** — **ESP32-S3** + módem **LTE-M / NB-IoT**, batería LiPo + panel solar. Sensores: suelo multiprofundidad **15/30/60 cm** (T + humedad), T/HR de aire, pluviómetro, anemómetro, piranómetro y mojado foliar. Habilita helada, riego, horas-frío, grados-día, **ET₀** y rosa de vientos.
- **Modelo B · Nodo rugerizado** — datalogger **STM32** IP67 (tipo NORVI), módem **LTE-M / NB-IoT**, batería de larga duración sin panel, entradas 4–20 mA + **RS-485/Modbus**. Sensores: T de aire y sonda de suelo 15/30/60 cm. Enfocado en helada y suelo por cuartel.

El módulo **CO₂/COV** queda relegado a **postcosecha** (cámara de guarda), no al
clima de campo. Reporte por HTTP / MQTT(S) / API.

> **Estado del hardware:** la configuración de sensores agro es una **propuesta
> técnica**, aún no un equipo físico terminado. El firmware de `example/` es el del
> **hardware base Makerfabs** (referencia, no el nodo agro final).

## Conectividad

**100% nube, sin gateway ni WiFi:** cada estación celular reporta **directo a la
nube**, con buffer local si cae la señal. SIM multioperador (Entel/Movistar/Claro).

## Despliegue

- **Web + dashboard:** GitHub Pages, publicado automáticamente desde `main` vía `.github/workflows/pages.yml`.
- **App Android:** el APK se compila con `.github/workflows/android.yml` y se publica en los Releases del repo.

## Planes (referencia, CLP) — sin plan gratis

| Plan | Para | Alcance | Precio* |
|---|---|---|---|
| **Piloto** | Prueba dirigida | 1 campo · 1 estación · 1 temporada | A medida |
| **Producción** | Campo en producción | Campos/estaciones ampliables, alertas ilimitadas, roles | $37.500/mes |
| **Multicampo / Empresa** | Agroindustria | Ilimitado, API + integración a certificación (GlobalGAP) + SLA | A medida |

\* Precios de referencia (CLP). Plan anual con descuento. Hardware se cotiza por separado.

---

<sub>Escalable de una parcela a toda la agroindustria: agrega estaciones, campos,
usuarios e integraciones sin cambiar de herramienta.</sub>
