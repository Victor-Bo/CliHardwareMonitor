// Modules
const http = require("http");
const table = require("text-table");
const minimist = require("minimist");
const ip = require("ip");
const fs = require("fs");
const CONFIG = JSON.parse(fs.readFileSync("./config.json"));

// Read the config file
const args = minimist(process.argv.slice(2));

// Data
const images = {
    "images_icon/computer.png": "",
    "images_icon/cpu.png": "",
    "images_icon/clock.png": "",
    "images_icon/temperature.png": "",
    "images_icon/load.png": "",
    "images_icon/power.png": "",
    "images_icon/nvidia.png": "",
    "images_icon/throughput.png": "ﬔ",
    "images_icon/hdd.png": "",
    "images_icon/level.png": ""
}

let tablelist = [];

// Recursive function which read the data of the data.json
const displayInfos = function (data, step) {
    data.Children.forEach((e) => {
        tablelist.push([(step == 1 ? "\n" : "")                                       // \n if step == 1
        + "  ".repeat(step)                                                           // Indentation
        + ((args["images"] && e.ImageURL in images) ? images[e.ImageURL]+" " : "")    // Images
        + e.Text                                                                      // Text
        + (e.Value ? ": " : "")
        , e.Value])                                                                    // Value
        displayInfos(e, step+1);
    });
}

if (CONFIG.test_data || args["test-data"]) {
    tablelist = [];
    displayInfos(JSON.parse(fs.readFileSync("./test_data.json")), 0);
    console.log(table(tablelist));
} else {
    // Make the request to the local webserver every CONFIG["delay"] seconds
    http.get(`http://${CONFIG.host || args.host || ip.address()}:${CONFIG.port || args.port || 8085}/data.json`, (res) => {
        let rawData = "";
        res.on("data", (chunk) => {
            rawData += chunk;
        });
        res.on("end", () => {
            tablelist = [];
            displayInfos(JSON.parse(rawData), 0);
            console.log(table(tablelist));
        });
    });
}