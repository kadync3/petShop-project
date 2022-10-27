function petShop (){
  console.log('using pets.js')
var fs = require("fs");
var dataArr = fs.readFileSync("pets.json");
var parsedData = JSON.parse(dataArr);
// if no argv[2]

if (process.argv[2] == undefined) {
 console.log("Usage: node pets.js [read | create | update | destroy]");
}

// wrap in a process.argv[2] if read
if (process.argv[2] == "read") {
  fs.readFile("pets.json", function (err, data) {
    var index = process.argv[3];

    dataArr = JSON.parse(data);

    if (dataArr[index] === undefined) {
      console.error("Usage: node pets.js read INDEX");
    } else if (data) {
      console.log(dataArr[index]);
    }
  });
}

// create new pet and push to dataArr

// process.argv2 create
if (process.argv[2] == "create") {
  var petObj = {
    age: process.argv[3],
    kind: process.argv[4],
    name1: process.argv[5],
  };
  //  console.log(petObj)

  if (
    petObj.age === undefined ||
    petObj.kind === undefined ||
    petObj.name1 === undefined
  ) {
    console.log("Usage: node pets.js create AGE KIND NAME");
  } else {
    parsedData.push(petObj);
    var addedPet = JSON.stringify(parsedData);
    fs.writeFile("pets.json", addedPet, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(petObj.name1, "added suceesfully");
      }
    });
  }
}

if (process.argv[2] === "update") {
  var Uindex = process.argv[3]
  var uDatePets = {
    age: process.argv[4],
    kind: process.argv[5],
    name: process.argv[6],
  };
  if (
    Uindex === undefined ||
    uDatePets.age === undefined ||
    uDatePets.kind === undefined ||
    uDatePets.name === undefined
  ) {
    console.error("Usage: node pets.js update INDEX AGE KIND NAME");
  } else {
    parsedData.splice(Uindex, 1, uDatePets)
    var updatePet = JSON.stringify(parsedData)
    fs.writeFile("pets.json", updatePet, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(uDatePets.Uname, "pet has been updated");
      }
    });
  }
}

if(process.argv[2] === "destroy"){
  var dIndex = process.argv[3]
 var deletePet =JSON.stringify(parsedData.splice(dIndex, 1))
 fs.writeFile("pets.json", deletePet, function(err){
  if (err){
    console.log(err)
  } else {
    console.log('pet has been deleted')
  }
 })
}
}
module.exports = petShop