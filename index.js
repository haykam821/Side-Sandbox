const express = require("express");
const app = express();

const browserify = require("browserify-middleware");
app.get("/bundle.js", browserify("./client/index.js"));

app.use(express.static("static"));

app.listen(5003);