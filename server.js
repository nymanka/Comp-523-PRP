const express = require('express');
const mongoose = require('mongoose');

const User = require('./User');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/PHP', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  try {
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
