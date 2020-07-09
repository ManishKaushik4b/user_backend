'use strict';

const lib = require('../lib');
const schemas = require('../schemas');
const jwt = require('jsonwebtoken');
const config = require('../config/app_config')
const mongoose = lib.mongo;
const userSchema = schemas.UserSchema;

/** @memberOf User */
userSchema.statics.createUser = function(params, cb) {

  let user = new User({
    name: params.name,
    email: params.email,
    gender: params.gender,
    picture: params.picture,
    phone_number: params.phoneNumber,
    role: params.role,
    password: params.password,
    subjects: params.subjects
  });

  console.log('user', user);

  user.save((err, userData)=>{
    if (err || !userData){
      err = err || new Error("No user added")
      cb(err);
    }
    return cb(null, userData);
  });
}


/** @memberOf User# */
userSchema.methods.generateAuthToken = function(){
  return jwt.sign({_id: this._id}, config.secret)
}

/** @class User */
let User = mongoose.model('User', userSchema)
module.exports = User;