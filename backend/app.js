const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;

const Post = require("./models/post");
const app = express();

// MongoClient.connect("mongodb+srv://niall:Redmane_web_dev1995@cluster0-dpclk.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true } )
mongoose.connect("mongodb+srv://niallmc:Gizs3PbG8PuBazeo@cluster0-drbp9.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true } )

.then(() => {
  console.log('Connected to database!')
})

.catch(() => {
  console.log('Connection failed!');
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  })


});

module.exports = app;