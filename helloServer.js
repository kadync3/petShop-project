'use strict';
const fs = require('fs')
const { createSecretKey } = require('crypto');
const http = require('http');
const port = process.env.PORT || 8000;
const petShop = require('./pets.js');
console.log('at server')
petShop()

const server = http.createServer(function(req, res) {
  if(req.url === '/pets'){
    res.setHeader('Content-Type', 'application/JSON');
    fs.readFile("pets.json",function (err, data) {
      
      let dataArr = JSON.parse(data);
      if (data) {
        res.end(JSON.stringify(dataArr));
      }
    });
    
  } else if (req.url === `/pets/1`){

    fs.readFile("pets.json",function (err, data) {
      let dataArr = JSON.parse(data);
    if (data) {
      res.end(JSON.stringify(dataArr[1]));
    }
  })
} 
});



server.listen(port, function() {
  console.log('Listening on port', port);
});