// Modules
const http = require("http");
const table = require("text-table");
const minimist = require("minimist");
const ip = require("ip");

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

// Make the request to the local webserver every CONFIG["delay"] seconds
http.get(`http://${args["host"] || ip.address()}:${args["port"] || 8085}/data.json`, (res) => {
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

// Recursive function which read the data of the data.json
const displayInfos = function (data, step) {
    data.Children.forEach((e) => {
        if (true) {
            tablelist.push([(step == 1 ? "\n" : "")                                       // \n if step == 1
            + "  ".repeat(step)                                                           // Indentation
            + ((args["images"] && e.ImageURL in images) ? images[e.ImageURL]+" " : "")    // Images
            + e.Text                                                                      // Text
            + (e.Value ? ": " : "")
            , e.Value])                                                                    // Value
            displayInfos(e, step+1);
        }
    });
}
