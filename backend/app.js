const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Contorl-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, Patch, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    { id:'fadf12421l', title: 'first server-side post', content: 'This is coming from the server'},
    { id:'ksajflaj132', title: 'second server-side post', content: 'This is coming from the server!'},

  ];
res.status(200).json({
  message: 'Posts fetched succesfully!',
  posts: posts
  });
});

module.exports = app;
