# PREGUNTAS PARA EL CLIENTE — App móvil Sembu

> Para validar con el cliente final junto al mockup (`mockup/index.html`).
> Cada respuesta **cambia el desarrollo**. Máximo 8.

1. **Datos reales vs. demo (BLOQUEANTE).** Hoy el SaaS **no tiene backend**: todo es demo simulada.
   ¿La app debe operar con **datos reales de estaciones** (implica construir ingesta + base time-series + API + auth + motor de alertas) o, por ahora, es una **demo para mostrar/vender**?
   → Define si la Etapa B es “empaquetar la demo” o “app real” (cambia radicalmente costo y plazo).

2. **Push de helada con la app cerrada.** El caso estrella es enterarse de la helada de madrugada.
   ¿La alerta debe llegar como **notificación push aunque la app esté cerrada** (requiere backend + FCM), o basta con verla al **abrir la app**?
   → Define si integramos push nativo (FCM + servidor de envío) o solo notificaciones locales.

3. **Quién usa la app en terreno.** ¿La usa **solo el operador**, también el **administrador**, o ambos?
   ¿El **superadmin** de plataforma la necesita en móvil?
   → Define qué pantallas y permisos se implementan en v1 (y cuáles quedan solo en web).

4. **Qué debe funcionar sin señal.** En el campo la cobertura es mala.
   ¿Qué tiene que servir **offline**: ver las últimas lecturas/alertas, marcar tareas, nada?
   → Define caché y persistencia local, y su prioridad.

5. **Reconocer/silenciar alarmas.** Al “Reconocer” una alarma, ¿debe **sincronizarse** para que el resto del equipo la vea como atendida, o es solo del teléfono?
   → Define endpoints de escritura y estado compartido.

6. **Tareas desde el celular.** ¿El operador **solo ve y marca** sus tareas, o también las **crea y asigna** desde la app?
   → Define si implementamos CRUD completo de tareas en móvil o solo lectura/checkbox.

7. **Mapa de cuarteles en v1.** ¿Necesitan el **mapa real** (Leaflet + GPS del operador) en la primera versión, o basta la **lista de cuarteles por estado** (más liviana)?
   → El mapa nativo agrega peso y permisos; define si entra en v1 o v2.

8. **Frecuencia y momento de uso.** ¿La app se abre **esporádicamente ante una alerta**, o **a diario** para operar el campo?
   → Define si optimizamos para “glanceable / push-first” o para uso intensivo con más navegación.
