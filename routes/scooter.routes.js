const express = require("express");
const router = require("express").Router();
const User = require("../models/User.model");
const Scooter = require("../models/Scooter.model");
const RentRequest = require("../models/RentRequest.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/* GET login page */
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});
// Handle POST requests to /login
router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((result) => {
      //if result exists
      if (result) {
        bcrypt.compare(password, result.password).then((isMatching) => {
          if (isMatching) {
            req.session.userName = result;
            res.redirect("/profile");
          } else {
            res.render("auth/login.hbs", { msg: "Password dont match" });
          }
        });
      } else {
        res.render("auth/login.hbs", { msg: "Email does not match" });
      }
    })
    .catch(() => {
      next(err);
    });
});
//GET request to handle profile

//GET signup page
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

//POST request to handle sign up
router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const { username, email, password, rider, owner, city } = req.body;

  //to check if the user has entered all three fields
  if (!username || !email || !password) {
    res.render("auth/signup", { msg: "Please enter all fields" });
  }

  //to check if the email is in the right format
  let re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    res.render("auth/signup", { msg: "Email not in valid format" });
    return;
  }

  //to validate the password - special character, some numbers, min  6 length

  // let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  // if (!regexPass.test(password)) {
  //   res.render("auth/signup", {
  //     msg:
  //       "Password needs to have special chanracters, some numbers and be 6 characters aatleast",
  //   });
  //   return;
  // }

  //to encrypt the password
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  //creating a user to mongodb
  User.create({ username, email, password: hash, rider, owner, city })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

//Middleware to protect routes
const checkUserName = (req, res, next) => {
  if (req.session.userName) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/profile", (req, res, next) => {
  res.render("profile.hbs");
});
//  router.get('/profile', checkUserName, (req, res, next) => {
//    let username = req.session.userName.username
//    res.render('profile.hbs', {username})
//  })

//GET and POST request to handle the feedback section//

router.get("/feedback", (req, res, next) => {
  res.render("feedback.hbs");
});
//create a new collection in mongodb

router.post("/feedback", (req, res, next) => {
  const FeedbackModel = mongoose.model('Feedback', { text: String, email: String });
  const { email, text } = req.body
  FeedbackModel.create({text, email})
  .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      res.render("feedback.hbs", { msg: "Please enter again both the fields" });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
