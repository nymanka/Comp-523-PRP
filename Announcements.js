// Announcements.js

const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

async function createAnnouncement(message) {
  try {
    const newAnnouncement = new Announcement({ message });
    await newAnnouncement.save();
    return newAnnouncement;
  } catch (error) {
    throw new Error('Error creating announcement');
  }
}

async function getAllAnnouncements() {
  try {
    const announcements = await Announcement.find().sort('-createdAt');
    return announcements;
  } catch (error) {
    throw new Error('Error fetching announcements');
  }
}

module.exports = {
  Announcement,
  createAnnouncement,
  getAllAnnouncements
};
