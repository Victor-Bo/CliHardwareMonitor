const http = require("http");

const types = {
    "Clocks": false,
    "Temperatures": true,
    "Load": false,
    "Levels": false,
    "Powers": false,
    "Data": false,
    "Throughput": false
}

setInterval(() => {
    http.get("http://192.168.1.13:8086/data.json", (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
            rawData += chunk;
        });

        res.on("end", () => {
            console.clear();
            displayInfos(JSON.parse(rawData), 0);
        });
    });
}, 1000);

const displayInfos = function (data, step) {
    data.Children.forEach((e) => {
        if (e.Text in types) {
            if (types[e.Text]) {
                console.log("  ".repeat(step) + e.Text)
                displayInfos(e, step+1);
            }
        } else {
            if (!e.Value) {
                process.stdout.write("\n");
            }
            console.log("  ".repeat(step) + e.Text + ": " + e.Value)
            displayInfos(e, step+1);
        }
    });
}