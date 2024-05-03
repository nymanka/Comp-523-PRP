
const express = require('express');
const fs = require('fs-extra');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./User');
const app = express();
// Import Announcements model and functions
const { Announcement, createAnnouncement, getAllAnnouncements } = require('./Announcements');

const saltRounds = 10;

const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

//Connect to Mongodb
mongoose.connect('mongodb://localhost:27017/PHP', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));


// Set up Multer (for file upload)
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // make sure this folder exists
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

//Sign in check
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  //Find username
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).send('username does not exist.');
    }
    //Check match passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Password is incorrect.');
    }

     // Exclude sensitive data from the user object before sending
     const userData = {
      id: user._id, // Consider sending only non-sensitive data
      username: user.username,
      email: user.email,
      waive: user.waive,
      formData: user.formData,
      // add other data you might need, but do not include the password
    };

    res.json(userData);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// User model has a formData field to store the form data
app.post('/saveFormData', async (req, res) => {
  const { userId, formData } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { formData: formData } },
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      res.json({ message: 'Form data saved successfully', updatedUser });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Error saving form data');
  }
});

// In Form, if Waive option has been changed
app.post('/saveWaiveOption', async (req, res) => {
  const { userId, waive } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { waive: waive } },
      { new: true } // Return the updated document
    );

    if (updatedUser) {
      res.json({ message: 'Waive option saved successfully', updatedUser });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error saving waive option:', error);
    res.status(500).send('Error saving waive option');
  }
});

app.post('/saveSchedulingData', async (req, res) => {
  const { selectedUserId, schedulingData } = req.body;


  try {
      const user = await User.findOne({ username: selectedUserId });
      if (!user) {
          console.log('No user found with username:', selectedUserId); // Debugging
          return res.status(404).send('User not found');
      }

      const updatedUser = await User.findByIdAndUpdate(
          user._id, // Using the ID from the found user
          { $set: { schedulingData: schedulingData } },
          { new: true }
      );

      if (updatedUser) {
          res.json(updatedUser);
      } else {
          res.status(404).send('User not found after update attempt');
      }
  } catch (error) {
      console.error('Error saving scheduling data:', error);
      res.status(500).send('Error saving scheduling data');
  }
});

// PDF File Upload
app.post('/uploadPdf', upload.single('pdfFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  if (path.extname(req.file.originalname).toLowerCase() !== '.pdf') {
    return res.status(400).send('Only PDF files are allowed.');
  }

  try {
    const userId = req.body.userId; // Ensure userId is passed with the file
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Check if there's an existing PDF and delete it
    if (user.pdfFileUrl) {
      const existingFilePath = path.join(__dirname, user.pdfFileUrl);
      await fs.remove(existingFilePath);
    }

    // Set new PDF URL
    const pdfUrl = `/uploads/${req.file.filename}`;
    
    // Update user's PDF URL
    const updatedUser = await User.findByIdAndUpdate(userId, { pdfFileUrl: pdfUrl }, { new: true });
    res.json({ message: "File uploaded successfully.", user: updatedUser });
  } catch (error) {
    console.error('File upload or deletion error:', error);
    res.status(500).send('Error uploading file');
  }
});



//Register user
app.post('/register', async (req, res) => {
  const {username, password, email, waive, semester,} = req.body;
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  //Validate username and email
  try {
    // Check if user exists with the same username or email
    let userExist = await User.findOne({ "$or": [{ username: username }, { email: email }] });
    if (userExist) {
      return res.status(400).send('Username or email already taken.');
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

app.post('/resetPassword', async (req, res) => {
  const { selectedUserId, password } = req.body;
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);

  try {
      const user = await User.findOne({ username: selectedUserId });
      if (!user) {
          console.log('No user found with username:', selectedUserId); // Debugging
          return res.status(404).send('User not found oogA BOOF');
      }

      const updatedUser = await User.findByIdAndUpdate(
          user._id, // Using the ID from the found user
          { $set: { password: req.body.password } },
          { new: true }
      );

      if (updatedUser) {
          res.json(updatedUser);
      } else {
          res.status(404).send('User not found after update attempt');
      }
  } catch (error) {
      console.error('Error saving new password:', error);
      res.status(500).send('Error saving new password');
  }
});

// Search users by name
app.get('/search', async (req, res) => {
  const { name } = req.query;

  try {
    // Perform a case-insensitive search for users whose names contain the specified query
    const users = await User.find({ username: { $regex: new RegExp(name, 'i') }, waive: { $ne: 'admin' } });

    res.json(users);
  } catch (error) {
    console.error('Error occurred during search:', error);
    res.status(500).send('Server error');
  }
});

// Get user data
app.get('/userData', async (req, res) => {
  // Extract user ID from request, typically done through authentication token
  // For now, sending the user ID in the query for simplicity
  const { userId } = req.query;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Server error');
  }
});



app.get('/users', async (req, res) => {
  const waiveStatus = req.query.waive;
  
  try {
      const users = await User.find({ 'waive': waiveStatus });
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
  }
});

// Add route to create an announcement
app.post('/announcement', async (req, res) => {
  const { message } = req.body;

  try {
    const newAnnouncement = await createAnnouncement(message);
    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).send('Server error');
  }
});

// Add route to fetch all announcements
app.get('/announcements', async (req, res) => {
  try {
    const announcements = await getAllAnnouncements();
    res.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).send('Server error');
  }
});

// Delete an announcement
app.delete('/announcement/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Announcement.findByIdAndDelete(id);
    if (result) {
      res.status(200).send('Announcement deleted successfully');
    } else {
      res.status(404).send('Announcement not found');
    }
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).send('Server error');
  }
});

// Middleware to check if the user is authenticated and an admin
function isAdmin(req, res, next) {
  console.log('User data:', req.user);
  // Assuming `req.user` holds the current user's info, typically set by some authentication middleware
  if (req.user && req.user.waive === "admin") {
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
}

app.post('/admin/reset', async (req, res) => {
  try {
    // Logic to delete files in '/uploads/'
    const uploadsDir = path.join(__dirname, 'uploads');
    await fs.emptyDir(uploadsDir); // fs-extra method to empty a directory without deleting it

    // Logic to delete non-admin users
    await User.deleteMany({ waive: { $ne: 'admin' } });

    // Logic to delete all announcements
    await Announcement.deleteMany({});

    res.send('Reset completed successfully');
  } catch (error) {
    console.error('Error during reset:', error);
    res.status(500).send('Server error during reset');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});