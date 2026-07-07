# AUDITORÍA TÉCNICA EXTERNA — `luismartinez-saas-agricultura`

- **Fecha:** 2026-07-07 (`date +%F`)
- **Rama:** `claude/sigamos-whe00g` · `git status` → limpio, al día con `origin/…`
- **HEAD:** `f1dc80b` (2026-07-07)
- **Alcance:** solo lectura. Evidencia verificable local, ahora. No se confía en relatos previos.

---

## 1. Checklist auditable

| # | Afirmación / entregable | Evidencia (comando → resultado) | Veredicto |
|---|---|---|---|
| 1 | **ANALISIS_MOVIL.md** entregado con contenido real | `ls -la` → 9902 B; `grep '^#' ` → 8 secciones (Identificación, Rutas, Auth, Capa de datos, CORE/SEC/EXCLUIR, Nativas, Riesgos, Resumen) | **HECHO** |
| 2 | **PREGUNTAS_CLIENTE.md** ≤ 8 preguntas de decisión | `ls` → 2345 B; `grep -cE '^[0-9]+\.'` → **8** | **HECHO** |
| 3 | **FASE2_PLAN.md** autocontenido (ETAPA B + hallazgos + API_BASE) | `ls` → 5431 B; `grep` → secciones "HALLAZGOS", "ETAPA B — STACK/REGLAS/DoD"; línea 20: `API_BASE real: NO DEFINIDA — no existe` | **HECHO** |
| 4 | **mockup/index.html** existe, tamaño > 0 | `ls -la mockup/index.html` → **201408 B** | **HECHO** |
| 5 | Mockup autocontenido (sin `src=/href=/@import` a http externo) | `grep 'src="http…/href="http…/@import…http'` → 1 hit (línea 859) que está **dentro del JS de Leaflet incrustado** (`!function(t,e){…leaflet`), es un enlace de atribución, no carga de asset. Sin `url()` http externas. | **HECHO** (con matiz, ver #6) |
| 6 | Mockup ¿100% offline? | `grep cartocdn` → **línea 1000** `L.tileLayer('https://{s}.basemaps.cartocdn.com/…')`: los **tiles del mapa se cargan por red en runtime**. Sin internet, el mapa no aparece. | **ROTO parcial** (autocontenido en assets, NO offline) |
| 7 | Mockup viewport móvil + branding del producto (no EON) | Línea 5 `name="viewport"…width=device-width`; línea 680 `width:390px` (marco); `grep -c Sembu` → 3, `grep EON` → **0** | **HECHO** |
| 8 | Mockup navegación JS funcional | Smoke test headless (Playwright): login→app visible; `tab('exportar')`→título "Exportar y compartir" + 4 tarjetas; `tab('alarmas')`→"Alarmas"; **pageErrors: []** | **HECHO** |
| 9 | Spot-check 1 — auth = `localStorage["mk.session"]` (afirmado en análisis) | `grep -n mk.session web/index.html` → líneas 411-412 (`get/set session` sobre localStorage) | **HECHO** |
| 10 | Spot-check 2 — tabs del dashboard declarados | `grep 'data-tab='` → `vivo,hist,cuarteles,alarmas,tareas,mensajes,config` (7/7) | **HECHO** |
| 11 | Spot-check 3 — tiles CARTO/OSM en dashboard | `grep` → línea 6 (CSP `cartocdn`+`openstreetmap`), línea 587 (`L.tileLayer`) | **HECHO** |
| 12 | "No hay backend / API / fetch" (afirmación central del análisis) | `grep fetch(/axios/XHR` en web+dashboard+mockup (excl. leaflet) → **0**; no hay `package.json` en raíz; único `fetch(` real = `dashboard/sw.js` (handler del SW) | **HECHO** |
| 13 | Cero fetch **relativos** en código destinado a nativo | `grep "fetch('/"` `"axios('/"` en web/dashboard/mockup → **NINGUNO** | **HECHO** |
| 14 | **GATE** — no existe código de producción de la app (Etapa B) | `grep -riE 'vite\|react\|@vitejs'` (excl. node_modules/vendor) → **VACÍO**. No hay stack Etapa B. | **HECHO** (gate respetado) |
| 15 | **GATE** — feedback del cliente registrado | `grep feedback FASE2_PLAN.md` → solo placeholders ("pegar feedback"), sin feedback real. Correcto: Etapa B no debe arrancar. | **PENDIENTE** (esperado) |
| 16 | Build web (`npm ci && npm run build`) | `ls package.json` (raíz) → **NO existe**. El sitio es HTML estático servido por Pages (`pages.yml`). No hay build web. | **NO APLICA** |
| 17 | Stack Android = **Capacitor 8** | `app/package.json` → `@capacitor/* ^6.2.0` (**v6, no 8**); `capacitor.config.json` → `appId com.makerfabs.airmonitor`, `appName "Air Monitor"` (**no Sembu**) | **ROTO vs. spec** (es legacy) |
| 18 | Workflow Android cumple spec Etapa B | `.github/workflows/android.yml`: `node-version "20"` (spec pide **22**); usa `android-actions/setup-android@v3` (spec lo **prohíbe**); JDK Temurin 21 ✓; `gradlew --no-daemon assembleDebug` ✓; artefacto `air-monitor-debug-apk` | **ROTO vs. spec** (es legacy) |
| 19 | Keystore de debug commiteado | `git ls-files \| grep keystore/jks` → **NINGUNO** | **PENDIENTE** |
| 20 | Estado de CI (runs) | Sin `gh` CLI en el entorno; los commits de Etapa A tocan `mockup/**`, que **no** está en los `paths:` de `android.yml` (`app/**`, `dashboard/**`) → no disparan build | **NO VERIFICABLE** localmente |
| 21 | Features fuera del CORE declarado en ANALISIS_MOVIL | Mockup implementa **Exportar/compartir** y **cambio de campo**, ausentes de la lista CORE (§4). Trazables a commits `f475c59` y `f1dc80b`, no al análisis. | **FANTASMA parcial** (documentado en commits, no en el CORE) |
| 22 | Deuda silenciosa (TODO/FIXME, catch vacíos) | `grep TODO/FIXME/XXX` en código → **0**. `catch(e){}` vacíos: web (7), dashboard (2), mockup (4) — todos **defensivos** (acceso a `localStorage`, `MAP.remove/invalidateSize`). Sin lógica de negocio tragada. | Nota menor |
| 23 | Transparencia del carácter DEMO | `grep -ci 'demo\|simulad' dashboard/index.html` → 18 menciones explícitas; `readme.md` línea 15-16 declara "datos DEMO simulados… backend real no construido" | **HECHO** (no oculta el estado) |

---

## 2. TOP 3 hallazgos críticos

1. **No existe backend real** — el "SaaS" es una demo 100% estática (sin API, sin auth de servidor, sin datos reales; auth = `localStorage`, `fetch` a datos = 0). La "Definición de Hecho" de la Etapa B ("login contra backend real", "flujos CORE con datos reales") es **inalcanzable** sin construir antes el backend. *(Está bien documentado en FASE2_PLAN §"🔴 Bloqueante", no está oculto.)*

2. **El proyecto Android committeado (`app/`) es legacy y no coincide con el stack exigido** — Capacitor **v6** (no 8), `appId com.makerfabs.airmonitor` / "Air Monitor" (no Sembu), y su `android.yml` usa **Node 20** + **`android-actions/setup-android`** (ambos contra la spec de Etapa B) y **sin keystore**. Si alguien dispara ese workflow creyendo que compila la app Sembu, obtiene el **APK equivocado (legacy)**.

3. **El mockup no es offline** — el mapa de cuarteles carga los tiles de CARTO por red en runtime (`mockup/index.html:1000`). Sin conexión, el mapa queda en blanco, lo que contradice parcialmente el objetivo "autocontenido / abrible en cualquier teléfono sin instalar". El resto de la app sí funciona offline (Leaflet va incrustado).

---

## 3. Orden recomendado de corrección *(solo recomendación — el auditor no corrige)*

1. **Decidir el backend** (bloqueante #1): definir si la Etapa B construye backend real o empaqueta la demo. Sin esa decisión, la DoD de Etapa B es inaplicable y nada más avanza con sentido.
2. **Sanear el legacy Android** (#2) antes de cualquier build: o marcar `app/` + `android.yml` como legacy inequívoco / retirarlos, o reemplazarlos por el stack Capacitor 8 con branding Sembu cuando arranque la Etapa B. Riesgo alto de compilar el APK equivocado mientras coexistan.
3. **Registrar el feedback del cliente** (#15) en `FASE2_PLAN.md` antes de tocar código de app — es el gate formal de la Etapa B.
4. **Cerrar el matiz del mapa** (#3): decidir si el mockup necesita mapa offline (embeber una imagen estática) o si se acepta la dependencia de red, y dejarlo dicho.
5. Reconciliar el **CORE** (#21): añadir Exportar/compartir y cambio de campo a la lista CORE de `ANALISIS_MOVIL.md`, o documentarlos como alcance ampliado a pedido.

---

## 4. Métrica de honestidad

- **Afirmaciones declaradas como HECHO** (entregables de Etapa A + sus afirmaciones internas verificables): filas 1-5, 7-14, 23 = **15**.
- **De esas, respaldadas por evidencia:** **15**.
- **Afirmaciones falsamente marcadas HECHO (overclaim):** **0**.

**→ Honestidad de los "HECHO": 15/15 = 100 %.** El repositorio **no sobre-declara**: lo pendiente (backend, feedback, Etapa B) está explícitamente marcado como pendiente, no disfrazado de hecho.

Sobre la checklist completa (23 filas): HECHO 15 · ROTO(parcial/vs-spec) 3 · PENDIENTE 2 · NO APLICA 1 · NO VERIFICABLE 1 · FANTASMA parcial 1 · nota 1.

*Salvedad del auditor:* los 3 "ROTO" (filas 6, 17, 18) no son afirmaciones-hecho incumplidas del proyecto, sino (a) un matiz del mockup y (b) código **legacy pre-misión** que la propia documentación marca como "a reemplazar". No hay evidencia de violación del gate ni de features inventadas como reales.
