const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const path = require("path");

// var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;

const postsRoutes = require('./routes/posts');

const userRoutes = require("./routes/user");

const app = express();

//*REFERENCE*
// https://mongoosejs.com/docs/index.html */

// here we are connecting to mongodb using mongoose 
mongoose.connect("mongodb+srv://niallmc:Gizs3PbG8PuBazeo@cluster0-drbp9.mongodb.net/node-angular", { useNewUrlParser: true } )

//letting me know if I am conntected to the database or not
  .then(() => {
    console.log("Connected to database!");
  })

  .catch(() => {
    console.log("Connection failed!");
  });
//parsing json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

//**REFERENCE
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS  */
//using access control headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
