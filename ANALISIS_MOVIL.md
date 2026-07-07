# ANÁLISIS MÓVIL — Sembu (plataforma agroclimática IoT)

> Auditoría del repositorio para llevar el SaaS web a una app Android (Capacitor 8).
> Todo lo de abajo está **verificado en el código**, no asumido.

## 0. Identificación del producto (verificada)

| Ítem | Valor detectado | Dónde |
|---|---|---|
| Producto | **Sembu** — plataforma agroclimática IoT (SaaS) para fruta de exportación (cerezo, palto, kiwi, arándano, uva, nogal) en Chile | `web/index.html` (`BRAND`), `CLAUDE.md` |
| Stack real | **SPA estática hecha a mano**: 2 archivos HTML con **JS inline**, sin framework ni bundler. No hay `package.json` en la raíz. | `web/index.html`, `dashboard/index.html` |
| Router | Hash router propio (`routes[...]`, `#/ruta`) | `web/index.html` |
| Publicación | GitHub Pages desde `main` (`pages.yml`); la raíz redirige a `/web/`; el dashboard es una **PWA** (`manifest.webmanifest` + `sw.js`) | `.github/workflows/pages.yml`, `index.html` |
| Idioma / moneda | Español (Chile) · CLP · `+56` | todo el repo |

**No hay:** build system, framework (React/Vue/etc.), TypeScript, tests, ni servidor. Es HTML+CSS+JS servido como archivos estáticos.

---

## 1. Mapa de módulos, rutas y pantallas

Hay **dos superficies** distintas:

### 1.1 `web/index.html` — sitio de marketing + “plataforma” demo con RBAC
Router por hash. Rutas públicas y rutas de app (`#/app/<page>`):

- **Público:** `#/home`, `#/productos`, `#/planes`, `#/ayuda`, `#/recursos`, `#/contacto`, `#/checkout`, `#/login`, `#/registro` (3 pasos), `#/recuperar`.
- **App (tras login), según rol** (objeto `NAV`):
  - **superadmin:** monitoreo · resumen · empresas · planes (MRR) · usuarios · dispositivos · ajustes
  - **admin:** monitoreo · resumen · campos · dispositivos · alarmas · equipo · reportes · facturación · ajustes
  - **operador:** monitoreo · resumen · campos · estaciones · alarmas · reportes
- El ítem “Monitoreo en vivo” abre el **dashboard** (`DASHBOARD_URL`, pantalla completa).

### 1.2 `dashboard/index.html` — la app de monitoreo real (PWA)
Tabs internos (`data-tab`):

| tab | pantalla | contenido |
|---|---|---|
| `vivo` | **Tiempo real** | alerta de helada + condiciones actuales + suelo/riego |
| `hist` | **Históricos** | series (temp, suelo, horas-frío, GD, ET₀) |
| `cuarteles` | **Mapa** | Leaflet + cuarteles/estaciones coloreados por estado |
| `alarmas` | **Alarmas** | alertas activas (helada, riego, batería…) |
| `tareas` | **Tareas** | agenda semanal + asignaciones |
| `mensajes` | **Mensajes** | canal interno del equipo del cliente |
| `config` | **Configuración** | equipo, cultivo, umbrales |

También hay selector de **Equipo** (perfiles HW A/B) y de **Cultivo** (CROPS).

---

## 2. Roles y flujo de autenticación

- **Roles (RBAC, client-side):** `superadmin` (plataforma, interno de Sembu) · `admin` (empresa cliente) · `operador`. Definidos en `ROLES` / `NAV`.
- **Login:** formulario email + contraseña **y** 3 botones de “demo as”. Ambos caminos hacen lo mismo:
  ```js
  store.session = {...DEMO_USERS[email], email};  go("#/app");
  ```
- **Sesión:** persistida en **`localStorage["mk.session"]`** (JSON) vía `store.session`. `renderApp()` lee `store.session`; si no existe → `#/login`. `logout` la borra.
- ⚠️ **No hay proveedor de identidad, ni tokens, ni validación en servidor.** La contraseña viene precargada (`demo`) y **no se verifica contra nada**. Es autenticación **100% simulada en el cliente**.

**Implicancia móvil:** no existe “misma autenticación contra el backend real” porque no hay backend ni auth real. Ver §6 (RIESGO).

---

## 3. Capa de datos

| Pregunta | Respuesta (verificada) |
|---|---|
| ¿Endpoints / API? | **Ninguno.** No hay cliente HTTP en el código de la app. |
| ¿`fetch` / `XMLHttpRequest` / `axios` / WebSocket? | **No en el código de la app.** El único `fetch(` está en `dashboard/sw.js:38` y es el **handler `fetch` del service worker** (caché), no una llamada a un backend. |
| ¿Fetch con **path relativo**? | **No existe ninguno** (no hay llamadas de red a datos). → En un APK no rompe nada porque no hay nada que romper; pero tampoco hay datos que traer. |
| ¿Base de datos? | **Ninguna.** Todos los datos son **DEMO hardcodeada** (objetos/arreglos JS que simulan lecturas: escenario “cerezos en Curicó, madrugada con helada”). |
| ¿URL de producción en `.env` / config? | **No hay `.env` ni archivo de config con URL.** No existe URL de API. |
| ¿Almacenamiento cliente? | `localStorage` (`mk.session`, `mk.cart`) y `sessionStorage` (`mk.quote`). |
| Llamadas de red externas reales | Solo **tiles de mapa** (Leaflet): `*.basemaps.cartocdn.com`, `*.tile.openstreetmap.org` (permitidas en la CSP del dashboard). La librería Leaflet está **auto-alojada** en `dashboard/vendor/`. |

> **Conclusión dura:** el “backend real del SaaS” **no existe todavía**. `CLAUDE.md` lo confirma: *“Backend real aún NO construido (todo el dashboard es DEMO): falta ingesta + base time-series + motor de alertas.”*

---

## 4. Funcionalidades clasificadas para móvil

El usuario en terreno (admin/operador de un campo) abre el celular para **reaccionar**, no para administrar. Eso define el CORE.

### CORE (imprescindible)
| Función | Justificación (1 línea) |
|---|---|
| **Login** | Puerta de entrada; sin ella no hay sesión ni contexto de campo. |
| **Tiempo real / Alerta de helada** | Es el motivo por el que se abre la app de madrugada: mínima proyectada + hora + acción. |
| **Alarmas (ver + reconocer)** | El operador reacciona a helada/riego/batería desde el celular en terreno. |
| **Estado por cuartel** | Saber **qué cuartel** está en riesgo y hacia dónde ir a proteger. |
| **Notificaciones push** | Es el canal que dispara la reacción; sin push, la alerta anticipada no sirve en el celular. |
| **Tareas del día** | El operador ve y marca los trabajos asignados (riego, revisión) en terreno. |
| **Exportar y compartir** | Generar un reporte (helada/semanal/históricos) y enviarlo por WhatsApp/correo al agrónomo o al equipo. *(Añadido al alcance a pedido; ver mockup.)* |
| **Cambio de campo** | El usuario opera varios campos; debe alternar entre ellos y ver el estado de cada uno. *(Añadido al alcance a pedido; ver mockup.)* |

### SECUNDARIA (útil, no bloqueante para v1)
- **Históricos / Reportes** (consulta, no el momento de terreno).
- **Mensajes del equipo** (chat interno).
- **Configuración de umbrales** por cultivo.
- **Detalle de humedad de suelo** por profundidad.

### EXCLUIR (desktop / web, no van en la app de terreno)
- **Marketing** (`#/home`, productos, recursos), **checkout**, **registro/onboarding**.
- **Superadmin de plataforma** (empresas/tenants, Planes y MRR) — gestión interna de Sembu.
- **Facturación**, **gestión de usuarios/equipo**, administración de la cuenta → mejor en escritorio.

---

## 5. Capacidades nativas requeridas

| Capacidad | ¿Para qué? | ¿Capacitor la cubre? |
|---|---|---|
| **Push notifications** | Alerta de helada con la app cerrada (el caso de uso estrella) | Sí: `@capacitor/push-notifications` (FCM). **Requiere un backend que envíe** (ver RIESGO). Para avisos locales/programados: `@capacitor/local-notifications`. |
| **Geolocalización** | Ubicar al operador respecto a estaciones/cuarteles en el mapa | Sí: `@capacitor/geolocation` (ya estaba en el `app/` legacy). |
| **Offline / caché** | Cobertura mala en campo; mostrar últimas lecturas | Sí, nativamente: Capacitor empaqueta los assets locales; + caché de datos cuando exista API. |
| **Share** | Compartir un reporte/alerta por WhatsApp | Sí: `@capacitor/share`. (SECUNDARIA) |
| **Status bar / Splash** | Marca Sembu | Sí: `@capacitor/status-bar`, `@capacitor/splash-screen`. |
| Cámara | No hay caso de uso claro en CORE | No requerida en v1. |

**BLE / background pesado / 3D:** **no se requieren.** La estación reporta **directo a la nube por celular (LTE-M/NB-IoT)**, no al teléfono → **no hay Bluetooth** ni pairing. Capacitor cubre todo el CORE sin módulos nativos pesados.

---

## 6. RIESGOS DE STACK

1. **🔴 BLOQUEANTE — No existe backend, ni API, ni auth real, ni datos reales.**
   La Etapa B pide “login contra el backend real” y “flujos CORE con datos reales”. **Hoy es imposible**: el SaaS es una demo estática. Antes (o en paralelo) hay que construir: ingesta desde las estaciones → base time-series → API de lectura/auth → motor de alertas + envío de push. Sin eso, la app solo puede empaquetar la **misma demo** (útil para validar UX y flujos, no para operar un campo real).
   → **Decisión requerida del cliente** antes de la Etapa B (ver `PREGUNTAS_CLIENTE.md`).

2. **🟠 El `app/` actual es legacy y no sirve como base.** Es Capacitor **v6**, `appId com.makerfabs.airmonitor`, appName **“Air Monitor”**, envuelve el dashboard tal cual (sin Vite/React), con paleta obsoleta (`#0b1020`). La Etapa B exige **Vite + React + Capacitor 8** y branding Sembu → se rehace, no se reutiliza. El `android.yml` también apunta al build legacy (Node 20, `android-actions/setup-android`, artefacto `air-monitor-*`) y debe rehacerse según el stack de Etapa B (Node 22, sin `setup-android`, keystore fijo).

3. **🟢 Push nativo depende del backend.** `@capacitor/push-notifications` (FCM) necesita un servidor que emita. Sin backend, en v1 solo hay **notificaciones locales** (`local-notifications`) simuladas. Push real = parte del backend.

---

## 7. Resumen para la Etapa B

- **API_BASE real:** _no existe aún_ → **debe definirse** (construir backend o entregar URL). Registrado como bloqueante en `FASE2_PLAN.md`.
- **Auth:** hoy demo (`localStorage`); la app real necesitará el mecanismo que defina el backend (token/JWT presumible).
- **Flujos CORE:** Login · Tiempo real/Helada · Alarmas · Estado por cuartel · Tareas · Push.
- **Plugins nativos:** `push-notifications` (o `local-notifications`), `geolocation`, `status-bar`, `splash-screen`, `share` (opcional). Sin BLE/nativo pesado.
- **Branding:** paleta y logo **Sembu** (verde `#4fe0a2`→lima `#a3e635`, mark «S» tallo), extraídos del repo. **No** usar branding de EON.
