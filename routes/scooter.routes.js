const express = require("express");
const router = require("express").Router();
const User = require('../models/User.model')
const Scooter = require('../models/Scooter.model')
const RentRequest = require('../models/RentRequest.model')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//to require all the models

const User = require("../models/User.model");
const Scooter = require("../models/Scooter.model");
const RentRequest = require("../models/RentRequest.model");
const FeedbackModel = require("../models/Feedback.model");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
            res.redirect("/profile");
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
      res.redirect("/login");
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
    res.redirect("/profile");
  }
};

router.get("/profile", (req, res, next) => {
  res.render("profile.hbs");
});
 router.get('/profile', checkUserName, (req, res, next) => {
   let email = req.session.email.email
   res.render('profile.hbs', {email})
 })



//ScooterdetailsInformation

router.get("/create-scooter", (req, res, next) => {
  res.render("/scooters/create-scooter.hbs");
});


// router.get('/scooters', (req, res, next) => {
 
//   Scooter.find()
//   .then((scooterlist) => {
//     res.render('scooters/scooterslist.hbs', {Scooter})
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// });

router.get('/scooters/create-scooter', (req, res, next) => {
  res.render('scooters/create-scooter.hbs')
});

router.post('/scooters/create-scooter',(req, res, next) =>{
  const {sbrandname, smaxspeed, smaxrange, smodelyear, smaxloadcapacity,simg} = req.body
    let newScooter = {
      brandName : sbrandname,
      maxSpeed : smaxspeed,
      maxRange : smaxrange,
      modelYear : smodelyear,
      maxLoadCapacity : smaxloadcapacity,
      image : simg,
      // user:req.session.userName._id
    }
    Scooter.create(newScooter)
    .then(() => {
      res.redirect('create-scooter.hbs' )
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/scooters/:id',(req, res) => {
  let id = req.params.id

  Scooter.findById(id)
  .then((newScooter) => {
    res.render('scooterslist.hbs',{newScooter})
  })
  .catch(() => {
       console.log('something goes wrong while finding id')
  })
})

// router.get('/scooters/:id/edit', (req, res, next) => {
  
//   let id = req.params.id

//   Scooter.findById(id)
//   .then((Scooter) => {
//       res.render('scooterlist.hbs', {Scooter})
//   })
//   .catch((error) => {
//       console.log(error)
//   })
// });

// router.post('/scooters/:id/edit', (req, res, next) => {
//   let id = req.params.id

//   const{sbrandname, smaxspeed, smaxrange, smodelyear, smaxloadcapacity, simg} = req.body
//     let newScooter = {
//       brandName : sbrandname,
//       maxSpeed : smaxspeed,
//       maxRange : smaxrange,
//       modelYear : smodelyear,
//       maxLoadCapacity : smaxloadcapacity,
//       image : simg
     
//     }
//    Scooter.findByIdAndUpdate(id, editedScooter, {new: true})
//     .then(() => {
//         res.redirect('/scooters')
//     })
//     .catch(() => {
//         console.log('Edit failed')
//     })
// });

// router.post('/scooters/:id/delete', (req, res, next) => {
  
//   let id = req.params.id
//   Scooter.findByIdAndDelete(id)
//       .then(() => {
//           res.redirect('/scooters')
//       })
//       .catch(() => {
//           console.log('Delete failed')
//       })
// });


<<<<<<< HEAD
//Logout
=======
//GET and POST request to handle the feedback section//

router.get("/feedback", (req, res, next) => {
  res.render("feedback.hbs");
});

router.post("/feedback", (req, res, next) => {
  const { name, text } = req.body
  FeedbackModel.create({name, text})
  .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      res.render("feedback.hbs", { msg: "Something wrong happened when sending the feedback, please fill it in again" });
    });
});

>>>>>>> origin/viktoria-code
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
