const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const booksRoutes = require("./routes/app");
const config = require('./config');

const app = express();

mongoose
  .connect(config.getDbConnectionString(), { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

var port = process.env.PORT || 3000;

app.use("/api", booksRoutes);

app.listen(port);
console.log('REST API is runnning at ' + port);

module.exports = app;
