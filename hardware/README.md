# Hardware — Nodo Sembu (referencia)

Referencia del nodo físico y del firmware. El producto agroclimático se ofrece en
**dos modelos** (el cliente elige uno por campo; el dashboard se adapta a sus sensores):

- **Modelo A · Estación completa** — **ESP32-S3** + módem **LTE-M / NB-IoT**, batería
  LiPo + panel solar. Sensores: suelo multiprofundidad **15/30/60 cm** (T + humedad),
  T/HR de aire, pluviómetro, anemómetro, piranómetro y mojado foliar. Habilita helada,
  riego, horas-frío, grados-día, **ET₀** y rosa de vientos.
- **Modelo B · Nodo rugerizado** — datalogger **STM32** IP67 (tipo NORVI), módem
  **LTE-M / NB-IoT**, batería de larga duración sin panel, entradas 4–20 mA +
  **RS-485/Modbus**. Sensores: T de aire y sonda de suelo 15/30/60 cm. Instalar y olvidar.

> **Estado (cero invención):** la configuración de sensores agro es una **propuesta
> técnica**, aún no un equipo físico terminado. Lo que hay en este directorio y en
> `example/` es el **hardware base** del que deriva el Modelo A, no el nodo agro final.

## Hardware base (legado, referencia)

El Modelo A deriva de la placa **Makerfabs 4G-LTE-CAT1-Air-Monitor**
(V1.0 · Vincent · 2023/8/22). Los planos de este directorio
(`4G LTE CAT1 Air Monitor V1.3.PDF`, `ESP32-S3 4G LTE CAT1 V1.2.PDF`) y el firmware de
`example/` corresponden a **esa placa base de calidad de aire (4G Cat-1)**, no al nodo
Sembu: sírvete de ellos solo como referencia de la electrónica y del módem.

- [Makerfabs home page](https://www.makerfabs.com/)
- [Makerfabs Wiki](https://wiki.makerfabs.com/)

### Características de la placa base
- Controlador: **ESP32-S3**
- Inalámbrico: WiFi + Bluetooth 5.0
- Módem celular de la placa base: **4G LTE CAT1** (A76XX / SIM7670) → **se migra a LTE-M / NB-IoT** en el nodo Sembu (mejor cobertura rural)
- Soporte Arduino y MicroPython
- Temperatura: electrónica **−40 … 85 °C** · con batería, rango efectivo más acotado (−20 … 60 °C)
- Batería LiPo 3.7 V (panel solar opcional)

## Uso

Documentación de soporte del módem (instrucciones AT y manuales oficiales) en
`A76XX Manual.zip` / `SIM7670 Manual.zip` en la raíz del repo.

### Opciones de compilación
- Conecta la placa al PC con el USB2UART de Makerfabs.
- Selecciona **"ESP32-S3 DEV Module"**.

### Ejemplo
`example/fw_test.ino` — al arrancar, lee los sensores de la **placa base** en ciclo y los
imprime por el puerto serie; sirve para probar comandos AT del módem. (Es firmware del
hardware base, no del nodo agro.)

## Comandos AT de referencia (telemetría)

```
AT+CSQ            → Calidad de señal        (+CSQ: 28,99)
AT+SIMCOMATI      → Info del módulo         (Model: A7670SA-FASE, IMEI: …)
AT+COPS?          → Operador                (+COPS: 0,2,"46000",7)
AT+CICCID         → ICCID de la SIM         (+ICCID: 898607E0102250030751)
AT+CBC            → Voltaje de alimentación (+CBC: 4.167V)
```

### HTTP
```
AT+HTTPINIT
AT+HTTPPARA="URL","http://…"
AT+HTTPACTION=0
AT+HTTPREAD=0,500
AT+HTTPTERM
```

### MQTT
```
AT+CMQTTSTART
AT+CMQTTACCQ=0,"client test0"
AT+CMQTTCONNECT=0,"tcp://broker:1883",60,1
AT+CMQTTSUB=0,9,1
AT+CMQTTPAYLOAD=0,60
```

> Los bloques de TTS, localización LBS y llamada de voz del módulo base se omiten
> por no aplicar a un nodo de telemetría agroclimática.
