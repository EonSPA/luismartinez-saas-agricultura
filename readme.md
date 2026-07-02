# SaaS Agricultura — Monitoreo agrícola inteligente

Plataforma **IoT + SaaS** para monitorear el ambiente de los cultivos en tiempo
real. Estaciones **4G LTE** con sensores de clima, humedad y calidad del aire, y
una plataforma web + app móvil con **alarmas, históricos, mapa, recomendaciones
automáticas y reportes**.

> 🔗 **Sitio:** https://eonspa.github.io/luismartinez-saas-agricultura/
> 🔗 **Plataforma (dashboard):** https://eonspa.github.io/luismartinez-saas-agricultura/dashboard/
> 📱 **App Android (APK):** ver [Releases](../../releases)

*Marca comercial: **Estrato** (adoptada 2026-07-01; pendiente verificar dominio y registro INAPI).*

---

## ¿Qué hace?

- **Tiempo real** — lecturas de cada sensor al instante (temperatura, humedad, eCO₂, TVOC, luz, batería, señal 4G).
- **Históricos** — series por rango con exportación a **CSV, Excel y PDF**.
- **Alarmas** — umbral alto/bajo, cambio brusco y caída de señal, con aviso visual, sonoro y push.
- **Mapa** — estaciones geolocalizadas (Google Maps) con ficha, histórico y exportación por sensor.
- **Recomendaciones automáticas** — sugerencias según las lecturas (ventilar, regar, proteger de heladas, cargar batería…).
- **Reportes** — informes por estación y periodo en PDF/Excel.
- **Índice de calidad del aire (AQI)** estimado a partir de eCO₂ y TVOC.
- **Roles multiempresa** — Super Admin, Admin de Cuenta, Supervisor de Campo, Agrónomo/Analista, Técnico/Operador y Visor.

## Casos de uso

Fruticultura · Viñas · Invernaderos · Hortalizas y campo abierto — protección de
heladas, riego de precisión y control de calidad del aire.

## Estructura del repo

| Carpeta | Contenido |
|---|---|
| `web/` | Sitio de marketing (se publica en GitHub Pages). |
| `dashboard/` | Plataforma SaaS como PWA (manifest + service worker). |
| `app/` | App Android (Capacitor) que empaqueta el dashboard. CI en `.github/workflows/android.yml`. |
| `mobile/` | Mockups de la app móvil. |
| `hardware/` | Planos y [referencia de firmware/AT](hardware/README.md) del nodo. |
| `brochure/` | Brochure comercial en PDF (`brochure.html` → `Brochure-Marca.pdf`). |
| `example/` | Ejemplos de firmware del nodo. |

## Hardware

Estación basada en **ESP32-S3** + módem **4G LTE CAT1** (A76XX / SIM7670), batería
LiPo y panel solar opcional. Sensores: **AHT10** (temp/humedad), **SGP30**
(eCO₂/TVOC), **BH1750** (luz), **PCF8563** (RTC). Reporte por HTTP / MQTT(S) / API.
Detalle en [`hardware/README.md`](hardware/README.md).

## Despliegue

- **Web + dashboard:** GitHub Pages, publicado automáticamente desde `main`
  vía `.github/workflows/pages.yml`.
- **App Android:** el APK se compila con `.github/workflows/android.yml` y se
  publica en los Releases del repo.

## Planes

| Plan | Para | Estaciones | Usuarios | Históricos | Precio* |
|---|---|---|---|---|---|
| **Starter** | Piloto / 1 campo | Hasta 2 | 1 | 7 días | Gratis |
| **Pro** | Productores / fundos | Hasta 15 | Hasta 10 | 1 año | $29.000/mes |
| **Empresa** | Multi-campo / agroindustria | Ilimitadas | Ilimitados | Ilimitado | A medida |

\* Precios de referencia (CLP). Plan anual con ~17% de descuento. Hardware se cotiza por separado.

---

<sub>Escalable de una parcela a toda la agroindustria: agrega estaciones, campos,
usuarios e integraciones (ThingSpeak, MQTT, Datacake, API) sin cambiar de herramienta.</sub>
