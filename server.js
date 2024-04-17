
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./User');
const app = express();
// Import Announcements model and functions
const { createAnnouncement, getAllAnnouncements } = require('./Announcements');

const saltRounds = 10;

const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

//Connect to Mongodb
mongoose.connect('mongodb://localhost:27017/PHP', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

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
          return res.status(404).send('User not found oogA BOOF');
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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});