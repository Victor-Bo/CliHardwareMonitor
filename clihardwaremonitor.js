// Modules
const http = require("http");
const fs = require("fs");
const table = require("text-table");
const minimist = require("minimist");

// Read the config file
const CONFIG = JSON.parse(fs.readFileSync("config.json"));
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
let types = {
    "clocks": true,
    "temperatures": true,
    "load": true,
    "levels": true,
    "powers": true,
    "data": true,
    "throughput": true
};

Object.keys(types).forEach((e) => {
    if (e in args && !args[e]) {
        types[e] = false;
    }
    if (e in args && args[e]) {
        types[e] = false;
    } else if (e in args && args[e]) {
        types[e] = true;
    }
});

let tablelist = [];

// Make the request to the local webserver every CONFIG["delay"] seconds
setInterval(() => {
    http.get(`http://${args["host"]}:${args["port"]}/data.json`, (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
            rawData += chunk;
        });

        res.on("end", () => {
            process.stdout.write('\033c');
            tablelist = [];
            displayInfos(JSON.parse(rawData), 0);
            console.log(table(tablelist));
        });
    });
}, args["delay"] || 1000);

// Recursive function which read the data of the data.json
const displayInfos = function (data, step) {
    data.Children.forEach((e) => {
        if (types[e.Text.toLowerCase()] || !(e.Text.toLowerCase() in types)) {
            tablelist.push([((!e.Value && !(e.Text.toLowerCase() in types)) ? "\n" : "") // \n if no value and not in types
            + "  ".repeat(step)                                                           // Indentation
            + ((args["images"] && e.ImageURL in images) ? images[e.ImageURL]+" " : "")    // Images
            + e.Text                                                                      // Text
            + (e.Value ? ": " : ""), e.Value])                                            // Value
            displayInfos(e, step+1);
        }
    });
}