// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  waive: String,
  semester: String,
  formData: {
    name: { type: String, default: '' },
    id: { type: String, default: '' },
    titleOfPRPTopic: { type: String, default: '' },
    researchAdvisor: { type: String, default: '' },
    prpSubmitted: { type: String, default: '' },
    fullAuthorList: { type: String, default: '' },
    paperAccepted: { type: String, default: '' },
    reviewsAvailable: { type: String, default: '' },
    partResponsibleFor: { type: String, default: '' },
    presentationScope: { type: String, default: '' },
},
  // Add other fields as necessary
});

const User = mongoose.model('User', userSchema);

module.exports = User;
