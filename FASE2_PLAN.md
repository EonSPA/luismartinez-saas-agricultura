# FASE 2 — Plan de desarrollo de la APK (Sembu)

> Documento **autocontenido**: la Etapa B debe poder ejecutarse en una sesión nueva de Claude Code
> sin depender de la conversación original.
>
> **Disparador (sesión nueva):** `Ejecuta FASE2_PLAN.md con este feedback: <pegar feedback del cliente>`
>
> **GATE:** no arrancar hasta tener el feedback del cliente sobre el mockup (`mockup/index.html`)
> y las respuestas de `PREGUNTAS_CLIENTE.md`.

---

## HALLAZGOS DE LA ETAPA A (alimentan la Etapa B)

Todo verificado en código. Detalle completo en `ANALISIS_MOVIL.md`.

### 🔴 Bloqueante — no hay backend
- El SaaS es una **SPA estática** (`web/index.html`, `dashboard/index.html`), datos **DEMO hardcodeada**.
- **No existe API, ni base de datos, ni URL de producción, ni auth real.**
- **`API_BASE` real: NO DEFINIDA — no existe.** La regla de ingeniería dice *“si no quedó registrada, pregunta antes de inventarla”*: **hay que preguntar / construir el backend antes de conectar datos reales.** No inventar una URL.

### Mecanismo de auth (actual)
- Demo client-side: `store.session = {...DEMO_USERS[email]}` persistido en **`localStorage["mk.session"]`**.
- **Sin tokens, sin proveedor, sin validación en servidor.**
- La app real usará el mecanismo que defina el backend (presumible: login → JWT/token en `Authorization: Bearer`). **A confirmar cuando exista backend.**

### Flujos CORE (aprobados en el mockup, ajustar con feedback)
1. **Login**
2. **Tiempo real / Alerta de helada** (mínima proyectada + hora + acción)
3. **Alarmas** (ver + reconocer)
4. **Estado por cuartel** (lista; mapa según respuesta a pregunta 7)
5. **Tareas del día** (ver/marcar; CRUD según pregunta 6)
6. **Notificaciones push** (según pregunta 2)

### Plugins nativos requeridos
- `@capacitor/push-notifications` (FCM) **o** `@capacitor/local-notifications` (según pregunta 2)
- `@capacitor/geolocation` (mapa/cuarteles, según pregunta 7)
- `@capacitor/status-bar`, `@capacitor/splash-screen`
- `@capacitor/share` (opcional, compartir alerta/reporte)
- **Sin BLE / sin nativo pesado** (la estación reporta a la nube por celular, no al teléfono).

### Branding (extraído del repo — NO usar EON)
- Paleta Sembu: `--bg:#1a2c26` `--panel:#284139` `--brand:#4fe0a2` `--brand2:#a3e635` `--accent:#f59e0b` `--frost:#7dd3fc` `--bad:#fb7185`.
- Logo: mark «S» tallo (gradient `#3ddc84`→`#a3e635`). Path en `mockup/index.html` (const `LOGO`).

### Legacy a reemplazar (no reutilizar tal cual)
- `app/` es Capacitor **v6**, appId `com.makerfabs.airmonitor`, appName “Air Monitor”, envuelve el dashboard sin Vite/React → **rehacer** con el stack de abajo.
- `.github/workflows/android.yml` apunta al build legacy (Node 20, `android-actions/setup-android`, artefacto `air-monitor-*`) → **rehacer** según el stack de abajo.

---

## ETAPA B — DESARROLLO APK (solo post-feedback)

### STACK OBLIGATORIO
- Vite + React (JS) + Capacitor 8. `capacitor.config.json` con `appId`, `appName` y `webDir: dist`. Carpeta `android/` commiteada al repo.
- Si la skill **compilador-android-eon** está disponible, úsala como fuente de verdad del build.
- Build en GitHub Actions, sin toolchain Android local:
  - Node 22 (Capacitor 8 exige >=22).
  - Java Temurin 21 exacto (17 FALLA con Capacitor 8).
  - SDK ya preinstalado en el runner: **NO** usar `android-actions/setup-android`; solo aceptar licencias con `yes | "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" --licenses`.
  - `npx cap sync android` → `cd android && ./gradlew assembleDebug --no-daemon`.
  - Artifact: `app/build/outputs/apk/debug/app-debug.apk`.
- Keystore de debug fijo commiteado, para reinstalar sin desinstalar (evita `INSTALL_FAILED_UPDATE_INCOMPATIBLE`).

### REGLAS DE INGENIERÍA
- Capa de datos: `API_BASE = Capacitor.isNativePlatform() ? <URL absoluta detectada en Etapa A> : ''`. Si no quedó registrada en este archivo, **pregunta antes de inventarla**. Cero fetch relativos en nativo.
  - ⚠️ En este proyecto **NO existe URL de API** (ver hallazgos). No inventarla: pedir la URL/definición del backend antes de conectar datos reales.
- Backend real del SaaS: misma autenticación, mismos endpoints. Nada de mocks ni backends paralelos.
  - ⚠️ Hoy **no hay backend**. Si el cliente aprueba “app real”, primero se define/construye el backend; si aprueba “demo”, se empaqueta la demo actual (declararlo explícito, sin fingir datos reales).
- Implementar SOLO los flujos CORE aprobados en el mockup + ajustes del feedback. No agregar features por iniciativa propia.
- Plugins nativos: `npm install @capacitor/<plugin>` → permisos en `AndroidManifest.xml` → `npx cap sync android` → rebuild por CI.
- Trabajo incremental: un flujo funcional end-to-end por iteración, con build compilable en cada paso. No escribir toda la app de una vez.

### DEFINICIÓN DE HECHO
- APK instala y abre en un Android real.
- Login funciona contra el backend real.
- Todos los flujos CORE operativos con datos reales.
- Workflow de CI en verde y reproducible.
- README con instrucciones de build e instalación.

> **Nota de realidad para la DoD:** “login contra backend real” y “flujos CORE con datos reales”
> solo son alcanzables si existe backend. Mientras no exista, la DoD aplicable es la de una
> **app demo empaquetada** (mismos flujos, datos simulados), y así debe declararse — sin inventar datos ni URLs.
