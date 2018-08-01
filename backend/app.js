const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;

const postsRoutes = require('./routes/posts');

const app = express();

mongoose
  .connect(
    "mongodb+srv://niallmc:Gizs3PbG8PuBazeo@cluster0-drbp9.mongodb.net/node-angular?retryWrites=true",
    { useNewUrlParser: true }
  )

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

app.use('/api/posts', postsRoutes);

module.exports = app;
