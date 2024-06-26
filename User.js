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
    nameOfJournal: { type: String, default: '' },
    paperAccepted: { type: String, default: '' },
    reviewsAvailable: { type: String, default: '' },
    listenWaiver: { type: String, default: '' }
  },
  schedulingData: {
    date: { type: String, default: '' },
    time: { type: String, default: '' },
    advisor: { type: String, default: '' },
    committee: { type: String, default: '' },
  },
  pdfFileUrl: { type: String, default: '' }
  // Add other fields as necessary
});

const User = mongoose.model('User', userSchema);

module.exports = User;
