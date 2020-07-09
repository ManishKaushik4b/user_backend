'use strict';

const timestamps = require('mongoose-timestamp');

const lib = require('../lib');

const mongoose = lib.mongo;
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: {type: String}
},{_id: false})

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true},
  password: {type: String, minlength:5, maxlength:1024, required: true},
  gender: { type: String },
  picture: { type: String },
  phone_number: { type: String },
  role: { type: String, enum: ['faculty', 'student'] },
  subjects: {type: [SubjectSchema]}
});

UserSchema.plugin(timestamps);

module.exports = UserSchema;