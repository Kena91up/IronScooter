const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//to require all the models

const User = require("../models/User.model");
const Scooter = require("../models/Scooter.model");
const RentRequest = require("../models/RentRequest.model");
const FeedbackModel = require("../models/Feedback.model");

/* GET login page */
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});
// Handle POST requests to /login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((result) => {
      //if result exists
      if (result) {
        bcrypt.compare(password, result.password).then((isMatching) => {
          if (isMatching) {
            req.session.email = result;
            let role = result.role;
            res.locals.showFeedback = true;
            res.locals.showLogout = true;
            res.locals.showLogIn = false;
            res.locals.showSignUp = false;
            if (role === "company") {
              res.redirect("/company-profile");
            } else {
              res.redirect("/rider-profile");
            }
          } else {
            res.render("auth/login.hbs", { msg: "Password does not match" });
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
//GET request to handle  company profile

router.get("/company-profile", (req, res, next) => {
  res.locals.showFeedback = true;
  res.locals.showLogout = true;
  res.locals.showLogIn = false;
  res.locals.showSignUp = false;
  res.render("scooters/company-profile");
});

//GET signup page
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

//POST request to handle sign up
router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const { username, email, password, role, city } = req.body;

  //to check if the user has entered all three fields
  if (!username || !email || !password || !city) {
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
  User.create({ username, email, password: hash, role, city })

    .then((result) => {
      req.session.email = result;
      let role = result.role;
      res.locals.showFeedback = true;
      res.locals.showLogout = true;
      res.locals.showLogIn = false;
      res.locals.showSignUp = false;
      if (role === "company") {
        res.redirect("/company-profile");
      } else {
        res.redirect("/rider-profile");
      }
    })
    .catch((err) => {
      next(err);
    });
});

//Middleware to protect routes
const checkUserName = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/profile", checkUserName, (req, res, next) => {
  let email = req.session.email.email;
  res.render("profile.hbs", { email });
});

//ScooterdetailsInformation

router.get("/scooters", (req, res, next) => {
  res.locals.showFeedback = true;
  res.locals.showLogout = true;
  res.locals.showLogIn = false;
  res.locals.showSignUp = false;
  Scooter.find()
    .then((scooter) => {
      res.render("scooters/showlist", { scooter });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/scooters/create-scooter", (req, res, next) => {
  res.locals.showFeedback = true;
  res.locals.showLogout = true;
  res.locals.showLogIn = false;
  res.locals.showSignUp = false;
  res.render("scooters/create-scooter.hbs");
});

router.post("/scooters/create-scooter", (req, res, next) => {
  let id = req.params.id;
  const {
    sbrandname,
    smaxspeed,
    smaxrange,
    smodelyear,
    smaxloadcapacity,
    simg,
    user,
  } = req.body;
  let newScooter = {
    brandName: sbrandname,
    maxSpeed: smaxspeed,
    maxRange: smaxrange,
    modelYear: smodelyear,
    maxLoadCapacity: smaxloadcapacity,
    image: simg,
    user: req.session.email._id,
  };
  Scooter.create(newScooter)
    .then(() => {
      res.redirect("/scooters");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/scooters/:id/edit", (req, res, next) => {
  res.locals.showLogout = true;
  res.locals.showLogIn = false;
  res.locals.showSignUp = false;
  let id = req.params.id;

  Scooter.findById(id)
    .then((scooter) => {
      res.render("scooters/scooter-update", { scooter });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/scooters/:id/edit", (req, res, next) => {
  let id = req.params._id;
  const {
    sbrandname,
    smaxspeed,
    smaxrange,
    smodelyear,
    smaxloadcapacity,
    simg,
  } = req.body;
  let editedScooter = {
    brandName: sbrandname,
    maxSpeed: smaxspeed,
    maxRange: smaxrange,
    modelYear: smodelyear,
    maxLoadCapacity: smaxloadcapacity,
    image: simg,
    user: req.session.email._id,
  };
  Scooter.findByIdAndUpdate(id, editedScooter, { new: true })
    .then(() => {
      res.redirect("/scooters");
    })
    .catch(() => {
      console.log("Edit failed");
    });
});
router.post("/scooters/:id/delete", (req, res, next) => {
  let id = req.params.id;
  Scooter.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/scooters");
    })
    .catch(() => {
      console.log("Delete failed");
    });
});

//GET and POST request to handle the feedback section//

router.get("/feedback", (req, res, next) => {
  res.locals.showLogout = true;
  res.locals.showLogIn = false;
  res.locals.showSignUp = false;
  res.render("feedback.hbs");
});

router.post("/feedback", (req, res, next) => {
  const { name, text } = req.body;
  FeedbackModel.create({ name, text })
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      res.render("feedback.hbs", {
        msg:
          "Something wrong happened when sending the feedback, please fill it in again",
      });
    });
});

//Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//Rider
router.get("/showlist-rider", (req, res, next) => {
  res.locals.showFeedback = true;
  res.locals.showLogout = true;
  res.locals.showLogIn = false;
  res.locals.showSignUp = false;
  Scooter.find()
    .then((scooter) => {
      res.render("rider/showlist-rider", { scooter });
    })
    .catch((error) => {
      console.log(error);
    });
});
//Booking request

router.get("/booking-request", (req, res, next) => {
  res.render("rider/booking-request");
});

router.post("/booking-request", (req, res, next) => {
  console.log(req.body, req.session);
  const { date, timeSlot, city } = req.body;

  RentRequest.find({ date, city }).then((rentRequests) => {
    //mapping through all the booking request and we grab the scooters
    const bookedScooters = rentRequests.map((rreq) => rreq.scooter);
    console.log(bookedScooters);
    //we grab one in this city which is not present in the 'booked scooters list'

    Scooter.findOne({ _id: { $nin: bookedScooters } }).then((scooter) => {
      if (!scooter) {
        // Handle scooter not found
        res.render("rider/booking-request", {
          msg: "Sorry, we don't have scooter available for the selected time",
        });
        return;
      }
      //in the mongodb object, where the user id is, is called email
      const user = req.session.email.id;
      RentRequest.create({ date, timeSlot, city, user, scooter: scooter._id })
        .then((newRent) => {
          console.log(newRent);
          res.redirect("/rider-profile");
        })
        .catch((err) => {
          console.log(err);
          res.render("rider/booking-request", {
            msg: "Please make your booking again",
          });
        });
    });
  });
});

router.get("/rider-profile", (req, res) => {
  res.locals.showFeedback = true;
  res.locals.showLogout = true;
  res.locals.showLogIn = false;
  res.locals.showSignUp = false;
  RentRequest.find({ user: req.session.email._id })
    .then((bookings) => {
      res.render("rider/rider-profile", { bookings });
    })
    .catch(() => {
      res.render("No requests yet");
    });
});

module.exports = router;
