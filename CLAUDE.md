# CLAUDE.md — Contexto del proyecto

> Memoria persistente para sesiones de Claude Code. Léela al inicio de cada sesión.

## Qué es este proyecto
El repo se renombra de `comparador-planos` a **`luismartinez-saas-agricultura`**
(hazlo en GitHub → Settings → Rename; git y Pages siguen funcionando por
redirección automática). La carpeta local del autor es `C:\proyectos code\LM-SaaSAgricultura`
(antes `LM-SaaSLecturaLTE`) — el nombre de la carpeta local es independiente del repo.
El producto es una **plataforma de monitoreo agrícola IoT (SaaS)**: estaciones
**4G LTE** + sensores que miden clima,
humedad y calidad del aire por parcela, con una **plataforma SaaS** (web +
dashboard + app Android) para tiempo real, históricos, alarmas, mapa,
recomendaciones y reportes.

- Repo GitHub: `eonspa/luismartinez-saas-agricultura` (antes `comparador-planos`)
- Sitio/dashboard públicos (tras el rename): https://eonspa.github.io/luismartinez-saas-agricultura/
- Idioma del producto y de la comunicación: **español (Chile)** — precios en **CLP**, teléfonos `+56`.

## Marca
- Nombre **aún sin definir**: se usa el placeholder **`[Marca]`** en todo el material.
- Candidato evaluado: *Sensagro* (no confirmado). No reemplazar `[Marca]` sin que el usuario lo pida.
- Datos de contacto en material comercial son **placeholders** (`www/ventas@ejemplo.cl`, `+56 9 0000 0000`).

## Identidad visual (paleta agrícola)
- Fondo verde-carbón `#0a140d` / paneles `#13241a`–`#193021`, líneas `#284a31`.
- Marca verde `#3ddc84`, lima `#a3e635`, acento ámbar `#f59e0b`, celeste `#38bdf8`.
- Texto `#eaf5ec`, muted `#a7c1af`. Logo = marca verde→lima con ondas.

## Estructura del repo
- `web/` — sitio de marketing (index.html). Se publica en GitHub Pages.
- `dashboard/` — plataforma SaaS (PWA: manifest + `sw.js`). Se publica en GitHub Pages.
- `app/` — app Android (Capacitor) que empaqueta el dashboard; build en `android.yml`.
- `mobile/`, `hardware/`, `example/` — firmware/ejemplos del nodo.
- `brochure/` — brochure comercial: `brochure.html` (fuente) → `Brochure-Marca.pdf` (8 págs A4).
- `.github/workflows/` — `pages.yml` (deploy web+dashboard desde **main**), `android.yml` (APK).

## Hardware
- Nodo **ESP32-S3** + módem **4G LTE CAT1** (A76XX / SIM7670), batería LiPo, panel solar opcional.
- Sensores: **AHT10** (temp/hum), **SGP30** (eCO₂/TVOC), **BH1750** (luz), **PCF8563** (RTC).
- Reporte por HTTP / MQTT(S) / API. Integraciones: ThingSpeak, Datacake, MQTT.

## Funcionalidades de la plataforma
Tiempo real · Históricos (export CSV/Excel/PDF) · Alarmas (umbral alto/bajo,
cambio brusco, offline; push) · Mapa (Google Maps) · **Recomendaciones
automáticas** según lecturas · Reportes · Índice AQI (de eCO₂/TVOC).
**Roles multiempresa (6):** Super Admin, Admin de Cuenta, Supervisor de Campo,
Agrónomo/Analista, Técnico/Operador, Visor.

## Planes (referencia, CLP)
- **Starter** — gratis, hasta 2 estaciones, 1 usuario, históricos 7 días.
- **Pro** — $29.000/mes (anual ~17% dto.), hasta 15 estaciones, 10 usuarios, 1 año.
- **Empresa** — a medida, ilimitado, API + SLA.

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
- El usuario continuará el trabajo desde **Chat (claude.ai) o Cowork**. Antes de pedir
  nuevas modificaciones va a **analizar la parte comercial**: marca, modelo de negocio
  y posicionamiento. Las próximas solicitudes de cambios saldrán de ese análisis.
- El sitio se sirve en GitHub Pages; **la URL raíz redirige a `/web/`** (hay `index.html`
  + `.nojekyll` en la raíz del repo). El dashboard de monitoreo está **montado dentro**
  del área privada (login con cuentas demo `@demo.cl`, primer ítem "Monitoreo en vivo").
- Flujo de publicación vigente: rama → **PR → merge a `main`** vía GitHub MCP
  (el push directo a `main` está bloqueado en la sesión; los push a la rama sí funcionan).

## Pendientes técnicos abiertos
- **Mapeo de campos ThingSpeak** (dashboard): el lector usa `field3=eCO₂,4=TVOC,5=Lux,6=Bat`
  pero el firmware/generador emite `field3=TVOC,4=eCO₂,7=Luz,8=Bat` (CSQ no se envía).
  Alinear lector + texto del modal al orden real del firmware.
- **About del repo** (descripción + web + topics): pendiente; probablemente manual
  (no hay tool MCP para editar metadatos del repo). Valores sugeridos ya redactados.

## Pendientes / ideas abiertas
- Definir marca real y reemplazar `[Marca]` + contactos (regenerar brochure).
- Recomendaciones por estación dentro del **Mapa**; umbrales **configurables**.
- Versión del brochure **en inglés** y variante **clara para imprimir**.
- Subir versión del caché del service worker (`v1`→`v2`) al publicar cambios.
- Checkout con Stripe real / traducir plataforma interna al inglés.
- Fotos reales del hardware (el proxy bloquea makerfabs.com; el usuario las aportará).
