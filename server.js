const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./User');
const app = express();

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
      option: user.option,
      // add other data you might need, but do not include the password
    };

    res.json(userData);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//Register user
app.post('/register', async (req, res) => {
  const {username, password, email, option, semester,} = req.body;
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
