const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
// first we need to validate user id and passowrd is present or not
// 2nd we have to create JWT token for that we need to in stall jwt package
// npm install --save jsonwebtoken
// reference link https://jwt.io/
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: user.email, userID: user._id },
         'Unknown@123',
         {expiresIn: "1h"}
         );
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});

module.exports = router;
