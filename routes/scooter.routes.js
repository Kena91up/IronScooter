const express = require('express');
const router = require("express").Router();
const User = require('../models/User.model')
const Scooter = require('../models/Scooter.model')
const RentRequest = require('../models/RentRequest.model')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* GET login page */
router.get("/login", (req, res, next) => {
  res.render('auth/login.hbs')
});
// Handle POST requests to /login
router.post("/login", (req, res, next) => {
  const {username, password} = req.body
 
  User.findOne({username})
    .then((result) => {
      //if result exists
      if(result){
          bcrypt.compare(password, result.password)
          .then((isMatching) => {
                if(isMatching){
                  req.session.userName = result
                    res.redirect('/profile')
                } else {
                     res.render('auth/login.hbs',{msg:'Password dont match'})
                }
          })
          } else {
            res.render('auth/login.hbs',{msg:'Email does not match'})
        }
    })
    .catch(() => {
      next(err)
   })
 
 });
 //GET request to handle /profile
 
 //Middleware to protect routes
 const checkUserName =(req, res, next) =>{
     if (req.session.userName) {
       next()
   }
   else {
       res.redirect('/login')
   }
   }
   
   router.get("/profile", (req, res, next) => {
    res.render('profile.hbs')
  });
  //  router.get('/profile', checkUserName, (req, res, next) => {
  //    let username = req.session.userName.username
  //    res.render('profile.hbs', {username})
  //  })
 
   router.get('/logout', (req, res) => {
     req.session.destroy()
     res.redirect('/')
   })
   

module.exports = router;