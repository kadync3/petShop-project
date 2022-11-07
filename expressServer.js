const { Client } = require("pg");
const connectionString = "postgresql://postgres:docker@127.0.0.1:5432/petshop";
const client = new Client({ connectionString: connectionString });
client.connect();
const petShop = require("./pets.js");

//  set up dependencies
const express = require("express");
const app = express();

// set up routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello! Welcome to my petShop.");
});
app.get("/pets", function (req, res) {
  client
    .query("SELECT * FROM pets")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.error(err.stack));
});
app.get(`/pets/:pets_id`, (req, res) => {
  let id = req.params.pets_id;
  client
    .query(`SELECT * FROM pets WHERE pets_id=${id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => console.error(err.stack));
});
app.post(`/pets`, function (req, res) {
  let petInfo = req.body;
  console.log(petInfo);
  client
    .query(
      `INSERT INTO pets (age, kind, name) VALUES ('${petInfo.age}','${petInfo.kind}','${petInfo.name}')`
    )

    .then((result) => {
      res.send(petInfo);
    })
    .catch((err) => console.error(err.stack));
});
app.delete("/pets/:pets_id", (req, res) => {
  var id = req.params.pets_id;
  client
    .query(`DELETE FROM pets WHERE pets_id=${id}`)
    .then((result) => {
      res.send("Pet " + id + " deleted");
    })
    .catch((err) => console.error(err.stack));
});
app.patch("/pets/:pets_id", (req, res) => {
  var id = req.params.pets_id;

  client
    .query(`UPDATE pets SET ${Object.keys(req.body)}='${Object.values(req.body)}' WHERE pets_id=${id}`)
    .then((result) => res.send(req.body))
    .catch((err) => console.error(err.stack));
});



// listining port
app.listen(8000, function () {
  console.log("Listining on port", 8000);
});
