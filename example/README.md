# `example/` — Firmware del hardware base (legado)

> **Aviso:** estos sketches son el **firmware original de la placa base Makerfabs
> 4G-LTE-CAT1-Air-Monitor** (calidad de aire, 4G Cat-1). **No** son el firmware del
> nodo agroclimático **Sembu**; se conservan solo como **referencia** de la electrónica
> y del módem celular.

## Por qué no corresponden al producto Sembu

- **Sensores:** leen aire (AHT10 T/HR, **SGP30 eCO₂/TVOC**, BH1750 luz), no los sensores
  agro del nodo Sembu (sonda de suelo 15/30/60 cm, pluviómetro, anemómetro, piranómetro,
  mojado foliar).
- **Conectividad:** stack **4G LTE Cat-1** (A76XX / SIM7670); Sembu usa **LTE-M / NB-IoT**.
- **Destino de datos:** ejemplos a **ThingSpeak** / **Datacake**; Sembu reporta a su
  propia plataforma (HTTP/MQTT).
- **Identidad:** algunos strings del portal de configuración aún dicen "Makerfabs" /
  "Air Monitor" / `AirM01`.

## Contenido

| Carpeta | Qué es |
|---|---|
| `fw_test/`, `fw_test_v1_4/` | Lectura de sensores + prueba de comandos AT del módem. |
| `low_power/` | Modo bajo consumo + portal de configuración WiFi de la placa base. |
| `MQTTS_Demo/` | Publicación MQTT(S) sobre 4G. |
| `Transmit_the_detection_data_to_Thingspeak/` | Envío a ThingSpeak (legado). |
| `Transmit_the_detection_data_to_Datacake/` | Envío a Datacake (legado). |

## Pendiente

El firmware del nodo Sembu (LTE-M/NB-IoT + sensores agro + ingesta propia) está **por
construir**. Al escribirlo, partir de aquí solo para el manejo del módem y reemplazar
sensores, conectividad y destino de datos. Regla del proyecto: **cero invención** — no
declarar como Sembu lo que hoy es la placa base de aire.
