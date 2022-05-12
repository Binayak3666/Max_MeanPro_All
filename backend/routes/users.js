const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

//for passoword store we have follow the encript formate for that we have to install npm install --save bcrypt
router.post("/signup", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "user created!",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(error, "from bcrypt hash");
    });
});

module.exports = router;
