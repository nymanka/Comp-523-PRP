// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  option: String,
  semester: String,
  // Add other fields as necessary
});

const User = mongoose.model('User', userSchema);

module.exports = User;
