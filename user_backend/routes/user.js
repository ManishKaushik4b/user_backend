// const express = require('express');
// const router = express.Router();
const bcrypt = require('bcrypt');
const Models = require('../models');
const User = Models.User

let UserController = {

  createuser: function(req, res, next){
    if (!req.body || !req.body.email || !req.body.name || !req.body.phone_number) {
      return next(new Error("Name/Email ID, gender/ and Phone number is required"));
    }

    let params = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      phoneNumber: req.body.phone_number,
      role: req.body.role,
      subjects: req.body.subjects.map((subject)=>{return {name: subject}}),
      password: bcrypt.hashSync(req.body.password, 8)
    }

    User.createUser(params, function(err, user){
      if (err){
        console.error(err);
        return next(new Error(err));
      }
      let token = user.generateAuthToken();
      res.header('x-auth-token', token)
      res.header({"Access-Control-Expose-Headers" : 'x-auth-token'})
      req.response = {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        subjects: (Array.isArray(user.subjects) && user.subjects[0])? user.subjects.map((subject)=>{return subject.name}): []
      }
      next();
    })
  },

  getuser: function(req, res, next) {
    if (!req.user._id) return next(new Error("No User ID Found"));
    User.findById(req.user._id, function(err, user){
      if (err || !user){
        err = err || new Error("No user found");
        console.error(err);
        return next(err);
      }
      req.response = user
      next();
    })
  },

  updateUser: function(req, res, next){
    if (!req.user._id || !req.body) return next(new Error("No Required Details found to update"));
    let update = req.body;
    if (Object.keys(update).length === 0)  return next(new Error("No Details present to update"));
    if (Array.isArray(req.body.subjects) && req.body.subjects[0]) 
      update.subjects = req.body.subjects.map((subject)=>{return {name: subject}})
    
    User.findOneAndUpdate({_id: req.user._id}, {$set: update}, { new: true },function(err, user){
      if (err || !user){
        err = err || new Error("No user found");
        console.error(err);
        return next(err);
      }
      req.response = {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        subjects: (Array.isArray(user.subjects) && user.subjects[0])? user.subjects.map((subject)=>{return subject.name}): []
      }
      next();
    })
  },

  deleteUser: function(req, res, next) {
    if (!req.user._id ) return next(new Error("No Required Details found to Delete"));
    User.findByIdAndRemove(req.user._id, function(err, user){
      if (err || !user){
        err = err || new Error("No user found");
        console.error(err);
        return next(err);
      }
      req.response = user
      next();
    });
  },

  findUserByEmail: function(req, res, next){
    if (!req.body.email) return next(new Error("Please provide Email"));
    User.findOne({email: req.body.email}, function(err, user){
      if (err){
        return next(err);
      }
      if (user) return next(new Error("User Already Registered"))
      next();
    });
  }
}

module.exports  = UserController;

