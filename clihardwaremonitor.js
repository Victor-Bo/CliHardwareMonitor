// Modules
const http = require("http");
const fs = require("fs");
const table = require("text-table");

// Read the config file
const CONFIG = JSON.parse(fs.readFileSync("config.json"));

let tablelist = [];

// Make the request to the local webserver every CONFIG["delay"] seconds
setInterval(() => {
    http.get(`http://${CONFIG["hostName"]}:${CONFIG["port"]}/data.json`, (res) => {
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
}, CONFIG["delay"]);

// Recursive function which read the data of the data.json
const displayInfos = function (data, step) {
    data.Children.forEach((e) => {
        if (e.Text in CONFIG["types"]) {
            if (CONFIG["types"][e.Text]) {
                tablelist.push(["  ".repeat(step) + e.Text]);
                displayInfos(e, step+1);
            }
        } else {
            if (!e.Value) {
                tablelist.push(["\n" + "  ".repeat(step) + e.Text])
            } else {
                if (CONFIG["emoji"]) {
                    tablelist.push(["  ".repeat(step) + CONFIG["emojis"][e.Type] + " " + e.Text + ": ", e.Value])
                } else {
                    tablelist.push(["  ".repeat(step) + e.Text + ": ", e.Value])
                }
            }
            displayInfos(e, step+1);
        }
    });
}