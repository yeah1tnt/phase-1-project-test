const express = require("express");
const path = require("path");
const app = express();

app.get("/*", function (req,res) {
    res.sendFile(path.resolve("index.html"));
});

app.listen(process.env.PORT || 4000, function () {
    console.log("Server running");
})