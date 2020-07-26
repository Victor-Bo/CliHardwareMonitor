# CliHardwareMonitor
A project that can get informations from LibreHardwareMonitor and displays these
informations on the terminal in a pretty way. The web server of LibreHardwareMonitor. Before using it you must create a 
`config.json` in the same folder of the script like this:
```json
{
  // Host name of the web server
  "hostName": "ip or domain",

  // Port of the web server
  "port": 8085,

  // Enable the emojis with Nerd Fonts
  "emoji": false,

  // The types to hide or display
  "types": {
    "Clocks": false,
    "Temperatures": true,
    "Load": false,
    "Levels": false,
    "Powers": false,
    "Data": false,
    "Throughput": false
  },

  // Emojis
  "emojis": {
    "Clocks": "",
    "Temperatures": "",
    "Load": "",
    "Levels": "",
    "Powers": "",
    "Data": "",
    "Throughput": "ﬔ"
  },

  // Delay of refresh in ms
  "delay": 1000
}
```
Here is the output :
```
DESKTOP-PK4VJGB:

  Intel Core i5-8300H:
    Temperatures
      CPU Core #1: 54,0 °C
      CPU Core #2: 51,0 °C
      CPU Core #3: 52,0 °C
      CPU Core #4: 51,0 °C
      CPU Package: 54,0 °C
      CPU Core #1 Distance to TjMax: 46,0 °C
      CPU Core #2 Distance to TjMax: 49,0 °C
      CPU Core #3 Distance to TjMax: 48,0 °C
      CPU Core #4 Distance to TjMax: 49,0 °C
      Core Max: 54,0 °C
      Core Average: 52,0 °C

  NVIDIA GeForce GTX 1050 Ti:
    Temperatures
      GPU Core: 0,0 °C

  ST1000LM035-1RK172:
    Temperatures
      Temperature: 34,0 °C

  KBG30ZMS256G NVMe TOSHIBA 256GB:
    Temperatures
      Temperature: 69,0 °C
      Temperature 1: 69,0 °C
```