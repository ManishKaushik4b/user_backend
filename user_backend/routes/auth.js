const bcrypt = require('bcrypt');
const Models = require('../models')
const jwt = require('jsonwebtoken');
const config = require('../config/app_config')
const User = Models.User;

let AuthController = {
  authenticate: function(req, res, next){
    if (!req.body.email && !req.body.password) {
      return res.status(400).send("Please Enter Email and password");
    }
    
    User.findOne({email: req.body.email}, function(err, user){
      if (!user) return res.status(400).send('Invalid email or password.');
      let validPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!validPassword) return res.status(400).send('Invalid email or password.');
      let token = user.generateAuthToken();
      res.header('x-auth-token', token)
      res.header({"Access-Control-Expose-Headers" : 'x-auth-token'})

      res.send({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        subjects: (Array.isArray(user.subjects) && user.subjects[0])? user.subjects.map((subject)=>{return subject.name}): []
      })
    });
  },

  verifyUser: function(req, res, next) {
    let token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
      let decoded = jwt.verify(token, config.secret);
      req.user = decoded; 
      next();
    }
    catch (ex) {
      console.log("ex: ", ex)
      res.status(400).send('Invalid token.');
    }
  }
}

module.exports = AuthController;