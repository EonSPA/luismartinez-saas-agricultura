# Hardware — Estación 4G LTE CAT1 Air Monitor

Referencia del nodo físico y del firmware base. Los planos están en este mismo
directorio (`4G LTE CAT1 Air Monitor V1.3.PDF`, `ESP32-S3 4G LTE CAT1 V1.2.PDF`).

Basado en la placa **Makerfabs 4G-LTE-CAT1-Air-Monitor** (V1.0 · Vincent · 2023/8/22).
- [Makerfabs home page](https://www.makerfabs.com/)
- [Makerfabs Wiki](https://wiki.makerfabs.com/)

## Características

- Controlador: **ESP32-S3**
- Inalámbrico: WiFi + Bluetooth 5.0
- Módem celular: **4G LTE CAT1** (A76XX / SIM7670)
- Soporte Arduino y MicroPython
- Temperatura de operación: **−40 °C a +85 °C**
- Batería LiPo 3.7 V (panel solar opcional)

## Uso

Toda la documentación de soporte (instrucciones AT y documentos oficiales) está
en `A76XX Manual.zip` / `SIM7670 Manual.zip` en la raíz del repo.

### Opciones de compilación
- Conecta la placa al PC con el USB2UART de Makerfabs.
- Selecciona **"ESP32-S3 DEV Module"**.

### Ejemplo
`fw_test.ino` — al arrancar, lee los sensores en ciclo y los imprime por el puerto
serie. Pulsa el botón WiFi para inicializar el módulo 4G. Sirve para probar comandos AT.

## Comandos AT de referencia

```
AT+CSQ            → Calidad de señal        (+CSQ: 28,99)
AT+SIMCOMATI      → Info del módulo         (Model: A7670SA-FASE, IMEI: …)
AT+COPS?          → Operador                (+COPS: 0,2,"46000",7)
AT+CICCID         → ICCID de la SIM         (+ICCID: 898607E0102250030751)
AT+CBC            → Voltaje de alimentación (+CBC: 4.167V)
```

### TTS
```
AT+CTTSPARAM=1,3,0,1,1
AT+CTTS=2,"Hi, Makerfabs"
```

### LBS (localización)
```
AT+CLBS=?
AT+SIMEI=xxxxx
AT+CLBS=1
```

### Llamada de voz
```
ATD<phone_number>;
AT+COUTGAIN=5
AT+CHUP
```

### TCP
```
AT+CIPMODE=1
AT+NETOPEN
AT+CIPOPEN=0,"TCP","122.114.122.174",39348
AT+CIPCLOSE=0
AT+NETCLOSE
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
AT+CMQTTCONNECT=0,"tcp://test.mosquitto.org:1883",60,1
AT+CMQTTSUB=0,9,1
AT+CMQTTPAYLOAD=0,60
```
