const fs = require("fs");
const petShop = require("./pets.js");

//  set up dependencies
const express = require("express");
const app = express();

// set up routes
app.use(express.json());

// app.get('/pets', function (req, res){
//   fs.readFile('pets.json', function(err, data){
//     let dataArr = JSON.parse(data)
//     if(err){
//       console.log(err)
//     } else {

//         res.send(dataArr)
//       }
//     })

//   })

app.get(/\/pets.*/, function (req, res) {
  fs.readFile("pets.json", function (err, data) {
    let dataArr = JSON.parse(data);
    let index = req.url.split("/").splice(2);
    console.log(index);
    if (index.length === 0) {
      res.send(dataArr);
    } else if (err) {
      console.log(err);
      res.send(err);
    }
    if (dataArr[index] === undefined) {
      res.status(404);
      res.send("not found");
    } else {
      res.send(dataArr[index]);
    }
  });
});

app.post(/\/pets$/, function (req, res) {
  var petObj = req.body;
  fs.readFile("pets.json", function (err, data) {
    let dataArr = JSON.parse(data);
  //  console.log(petObj)
  dataArr.push(petObj);
  var addedPet = JSON.stringify(dataArr);

  if (
    petObj.age === undefined ||
    petObj.kind === undefined ||
    petObj.name1 === undefined
  ) {
    console.log("Usage: node pets.js create AGE KIND NAME");
  } else {
    fs.writeFile("pets.json", addedPet, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(petObj.name1, "added suceesfully");
        res.send(petObj.name1)
      }
    });
  }
  
});
});

// listining port
app.listen(8000, function () {
  console.log("Listining on port", 8000);
});
