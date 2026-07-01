# Estudio de mercado — Monitoreo agroclimático para fruta de exportación

> Investigación asistida (deep-research, 2026-07-01). **Léelo con la advertencia metodológica:** varias afirmaciones NO pudieron verificarse por bloqueo de red, y las cifras de mercado son estimaciones de firmas comerciales, no hechos auditados. Regla del proyecto: **cero invención** — lo no verificado se marca como tal.

## 1. Resumen ejecutivo
- El mercado de monitoreo agroclimático/suelo IoT crece con fuerza (CAGR ~14–15%), con LatAm emergente pero de base incipiente (conectividad rural 26–50%, costo prohibitivo para pequeños, mercado fragmentado).
- **Competidor directo #1 en Chile: Instacrops** (agtech chilena). Ya ofrece **alerta de helada anticipada** (módulo InstaFrost), humedad de suelo, control de riego y agentes de IA por **WhatsApp**, en modelo de suscripción.
- **Agurotech (Países Bajos)** valida el enfoque **suelo multiprofundidad + riego**, pero su alerta de helada es **reactiva por umbral** (no predictiva) y **sin presencia en Chile**.
- Existe un **competidor gratuito estructural**: el Estado, vía **RAN-AGROMET** (433 estaciones), que envía **alertas de helada gratis** por SMS/email.
- **Oportunidad:** combinar **pronóstico de helada anticipado y específico por cultivo/fenología** con **riego por humedad de suelo multiprofundidad + horas-frío/grados-día + ET₀**, **a nivel de cuartel**, enfocado en fruta de exportación.

## 2. Advertencia metodológica
- **Cobertura incompleta de competidores.** Wiseconn, Semios, Pessl/Metos, Sencrop, CropX, Arable, Agryon, Davis, Campbell Scientific, Onset/HOBO, Hortau, Phytech, Sensoterra, Teralytic, Netafim/NetBeat y Meteoblue: **ninguna afirmación sobre ellos sobrevivió la verificación adversarial**. Quedan como **investigación dirigida pendiente**.
- **Bloqueo de proxy.** `WebFetch` dio HTTP 403 en casi todos los sitios primarios; la verificación se apoyó en snippets de búsqueda y fuentes secundarias.
- **Cifras de mercado = estimaciones de vendors** (Grand View, MarketDataForecast, IMARC), metodología opaca, dispersión 20–30% entre firmas. Citar como "estimación".
- **Autodescripción de vendors.** Las capacidades declaradas por Instacrops (>90% precisión) y Agurotech (FDR "patentada") son marketing propio, no auditado.

## 3. Mercado (estimaciones de research, no auditadas)
| Segmento | Base | Proyección | CAGR |
|---|---|---|---|
| Smart crop monitoring (global) | USD 2,31 B (2023) | USD 5,77 B (2030) | 14,1% |
| Soil monitoring (global) | USD 764 M (2024) | USD 1,76 B (2030) | 15,3% |
| Soil monitoring (LatAm) | — | ~USD 125 M (2030) | ~14% |
| Precision agriculture (LatAm) | base incipiente | — | ~15,4% (2025–33) |

Hardware lidera la cuota global (57,7% en 2023). LatAm: adopción creciente de IoT (humedad de suelo, temperatura, HR) pero desde penetración baja.

## 4. Competidores verificados
| Player | Qué es | Helada | Suelo / riego | Chile / LatAm | Modelo |
|---|---|---|---|---|---|
| **Instacrops** 🇨🇱 | Agtech chilena IA+IoT, 10+ años, 20+ cultivos | **InstaFrost — predicción anticipada** (declara ~12 h antes, >90%, *marketing sin auditar*) | InstaSoil (humedad) + InstaFlow (riego) + InstaWell (pozos) | **Sí, fuerte** (Chile, México, Colombia; exporta a Perú/Argentina) | Suscripción (PAaaS), agentes por **WhatsApp** |
| **Agurotech** 🇳🇱 | Sensores de suelo **FDR** multiprofundidad (15/30/45/60 cm) + app unificada | **Reactiva por umbral** en tiempo real (no predictiva) | Riego con plan a 10 días por cultivo y tipo de suelo | **No** (>1.000 productores en NL, foco Europa) | Venta de hardware + plataforma |
| **RAN-AGROMET** (Estado 🇨🇱) | Red Agroclimática Nacional, 433 estaciones, alianza público-privada (INIA, FDF, CEAZA…) desde 2013 | **Alerta de helada/golpe de calor GRATIS** por SMS/email, semáforo actualizado 21:30 | Datos públicos de estaciones | Nacional | **Gratuito** (registro en agromet.cl) |

## 5. Refutado / no verificado (no usar como hecho)
- ❌ Instacrops "predice rendimientos con 90% de precisión" → **refutado** (0-3).
- ❌ RAN-AGROMET "cubre de Atacama a Ñuble" → **refutado** (0-3); no afirmar rango geográfico.
- ❌ Cifras absolutas del mercado agtech LatAm (USD 2.200 M→10.400 M; USD 1,86 B→6,75 B) → **refutadas por inconsistencia entre fuentes**.
- ⚠️ El ">90% / 12 h" de InstaFrost y el "FDR patentada" de Agurotech son autodescripción de vendor.

## 6. Preguntas abiertas (definen el tamaño real del hueco)
1. ¿Qué ofrecen **de verdad** Wiseconn (DropControl), Semios, Pessl/Metos, Sencrop, CropX, Phytech y Hortau en Chile/LatAm (hardware, modelos, cultivos, presencia, pricing)?
2. ¿Alguien más que RAN-AGROMET ofrece **pronóstico de helada por cultivo/fenología** (no solo umbral)?
3. **Pricing real de Instacrops** (suscripción anual PAaaS) para posicionar el plan Producción ($37.500/mes ref.).
4. ¿Cómo compite un producto de pago contra el servicio **gratuito** del Estado? (valor incremental).

## 7. Posicionamiento y decisiones de producto
### Frente a Instacrops (competidor #1, chileno, ya hace helada anticipada + WhatsApp + IA)
No competir de frente como "otra plataforma IoT con IA". Diferenciar por **especialización vertical y rigor agronómico**:
- **Foco en fruta de exportación premium** (cerezo, palto, kiwi, arándano, uva de mesa, nogal) con **umbrales y fenología por cultivo/variedad**, no un genérico de 20+ cultivos.
- **Profundidad del frío**: Horas de Frío (<7,2 °C) + **Porciones de Frío (Dynamic)** + salida de dormancia por variedad — decisivo en cereza/kiwi y poco explotado por monitores genéricos.
- **Integración de la decisión**: helada + suelo 15/30/60 + ET₀ (Penman-Monteith) + balance hídrico en **una sola vista**, no módulos sueltos.
- **Trazabilidad para certificación (GlobalGAP)** como gancho de exportación.
- **Nivel por cuartel**, no solo por campo.
- Realismo: Instacrops tiene ventaja en madurez, canal WhatsApp e IA. No pelear el canal; ganar en **especialización + agronomía + UX centrada en la decisión de helada**.

### Frente a RAN-AGROMET (Estado, gratis)
El gratis cubre alerta **zonal** con estaciones **dispersas**. El pago se justifica con:
- **Densidad en el predio**: una estación por sector/cuartel vs la estación pública más cercana a varios km.
- **Dato del sitio** (microclima real del cuartel) vs interpolación regional — la helada radiativa es intensamente local.
- **Acción integrada**: no solo "avisa", sino riego por humedad, horas-frío, ET₀ y recomendación por cultivo. El Estado **solo alerta**.
- **Anticipada y por cuartel**: qué sector proteger primero.
- **Buena fe**: reconocer en la web que existe la alerta pública y explicar el valor incremental (suma credibilidad).

### Wedge / declaración de posicionamiento
> "La estación agroclimática **por cuartel** para fruta de exportación: no solo te avisa de la helada — **la anticipa por cultivo** y te dice **si regar, cuánto frío llevas y cuánto reponer**, en una sola pantalla."

### Acciones concretas para el producto
- **Web**: agregar un bloque/FAQ **"¿Por qué pagar si el Estado avisa gratis?"** (densidad · dato del sitio · acción integrada · por cuartel). Desarma la objeción #1 con honestidad.
- **Web/dashboard**: enfatizar **"por cuartel"** y **"por cultivo/variedad"** en hero y módulos (hoy ya hay selector de cultivo; reforzar el cuartel).
- **Pricing**: **conseguir el precio de Instacrops** antes de fijar; $37.500/mes es placeholder.
- **Research pendiente**: cerrar Wiseconn/Semios/Metos reales (hoy bloqueados por proxy).

## 8. Fuentes (verificadas / consultadas)
- Instacrops: https://www.instacrops.com/ · Forbes Chile · Diario Financiero · FreshPlaza · TechCrunch
- Agurotech: https://www.agurotech.com/en/solutions/frost-monitoring · /sensor-technology · Royal Eijkelkamp · Tracxn
- RAN-AGROMET: https://minagri.gob.cl/ (nota alertas) · https://www.agromet.cl · FIA · reporteagricola.cl
- Mercado: Grand View Research (smart crop monitoring; soil monitoring) · MarketDataForecast (LatAm precision ag) · IMARC (LatAm agritech)

*Documento generado por investigación asistida (deep-research). Contrastar y cerrar las preguntas abiertas antes de usarlo en decisiones comerciales.*