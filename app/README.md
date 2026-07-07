# Sembu — App móvil (Capacitor) · wrapper legacy

> **Nota (legacy):** este proyecto empaqueta el **dashboard actual** con Capacitor **6**.
> La app **definitiva** de Sembu se construye en la **Etapa B** (Vite + React + **Capacitor 8**,
> con backend real) — ver [`FASE2_PLAN.md`](../FASE2_PLAN.md). Este wrapper sirve como build de prueba.

Empaqueta el **dashboard web** (`../dashboard`) como app nativa **Android** (e **iOS**)
usando [Capacitor](https://capacitorjs.com). No se reescribe nada: el dashboard es la
única fuente de verdad y se copia a `www/` antes de cada build.

- **App ID:** `com.makerfabs.airmonitor` *(legacy; se renombra en la Etapa B)*
- **Nombre:** Sembu
- **Plugins nativos:** App, Geolocation, Local Notifications, Splash Screen, Status Bar

## Obtener el APK sin instalar nada (recomendado)

Cada push que toque `app/` o `dashboard/` dispara el workflow
[`Build Android APK`](../.github/workflows/android.yml) en GitHub Actions, que compila
el APK de depuración y lo sube como **artefacto** `sembu-dashboard-debug-apk`.
Descárgalo desde la pestaña **Actions** del repositorio. También puedes lanzarlo a mano
con **Run workflow** (workflow_dispatch).

## Compilar en local

Requisitos: **Node 18+**, **JDK 17/21** y el **Android SDK** (platform 34, build-tools 34).
Lo más cómodo es instalar [Android Studio](https://developer.android.com/studio) (trae el SDK).

```bash
cd app
npm install                 # dependencias de Capacitor
npm run sync-web            # copia ../dashboard -> www
npx cap add android         # genera el proyecto nativo (solo la primera vez)
npx cap sync android        # copia web + plugins al proyecto nativo

# APK de depuración:
cd android && ./gradlew assembleDebug
# -> android/app/build/outputs/apk/debug/app-debug.apk

# o abre el proyecto en Android Studio:
npm run open:android
```

Atajo equivalente: `npm run build:android`.

## Instalar el APK en el teléfono

1. Copia `app-debug.apk` al dispositivo (o `adb install app-debug.apk`).
2. Permite "instalar apps de orígenes desconocidos" si el sistema lo pide.
3. La app pedirá permisos de **ubicación** (mapa) y **notificaciones** (alarmas).

> El APK de depuración es para pruebas. Para publicar en Google Play hay que generar
> un **App Bundle firmado** (`./gradlew bundleRelease` con un keystore propio).

## Actualizar la app cuando cambie el dashboard

```bash
npm run sync       # sync-web + cap sync
```
Luego recompila el APK. En CI esto es automático.

## iOS

La misma base sirve para iOS: en un Mac con Xcode,
`npx cap add ios && npx cap sync ios && npx cap open ios`.
La compilación de iOS requiere macOS + Xcode, por lo que no se cubre en el CI de Linux.

## Notas

- Las notificaciones de alarma usan la API web del dashboard. Para **push nativo con la
  app cerrada** (FCM/APNs) se integraría `@capacitor/local-notifications` o
  `@capacitor/push-notifications` con un backend; queda como siguiente paso.
- `www/`, `node_modules/` y las salidas de build están en `.gitignore`; el proyecto
  nativo `android/` sí se versiona (convención de Capacitor).
