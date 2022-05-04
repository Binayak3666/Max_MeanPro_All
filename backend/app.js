const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts")

const app = express();

mongoose.connect("mongodb+srv://binayakhotta:Spbr1995@freecluster.5ubcq.mongodb.net/mean-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware is app.use
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts",postsRoutes);

//we need to export
module.exports = app;
