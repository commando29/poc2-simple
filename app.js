

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, ".")));
app.use(express.static('.'))

app.get("/*jsplumb.browser-ui.es.js", (req, res) => {
    var x = path.resolve(__dirname, "node_modules/@jsplumb/browser-ui/js/jsplumb.browser-ui.es.js");
    res.sendFile(x);
});

app.get("/*jsplumb.browser-ui.umd.js", (req, res) => {
    var x = path.resolve(__dirname, "node_modules/@jsplumb/browser-ui/js/jsplumb.browser-ui.umd.js");
    res.sendFile(x);
});

app.get("/*", (req, res) => {
    var x = path.resolve(__dirname, "index.html");
    res.sendFile(x);
});

app.listen(process.env.PORT || 3300, () => console.log("Server running on port 3300..."));