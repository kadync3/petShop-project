"use strict";
const fs = require("fs");
const { createSecretKey } = require("crypto");
const http = require("http");
const port = process.env.PORT || 8000;
const petShop = require("./pets.js");
console.log("at server");
petShop();

const server = http.createServer(function (req, res) {
  var test = req.url.split("/").slice(1);
  console.log(test);
  var testNum = test[test.length - 1];
  if (test[0] === "pets" && test[1] === undefined) {
    res.setHeader("Content-Type", "application/JSON");
    fs.readFile("pets.json", function (err, data) {
      let dataArr = JSON.parse(data);
      if (data) {
        res.end(JSON.stringify(dataArr));
      }
    });
  } else if (test[0] === `pets` && test[1] === testNum) {
    console.log(test[test.length - 1]);
    fs.readFile("pets.json", function (err, data) {
      let dataArr = JSON.parse(data);
      if (dataArr[testNum] === undefined) {
        res.end("Usage: node pets.js read INDEX");
      }
      if (data) {
        res.end(JSON.stringify(dataArr[testNum]));
      }
    });
  } else {
    res.end("err dUmBDuMb");
  }
});

server.listen(port, function () {
  console.log("Listening on port", port);
});
