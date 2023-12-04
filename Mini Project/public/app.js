const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Experience Vault', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Sign Up Endpoint
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  newUser.save((err, user) => {
    if (err) {
      res.status(400).send('Unable to sign up');
    } else {
      res.status(200).send('Signed up successfully!');
    }
  });
});

// Sign In Endpoint
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password }, (err, user) => {
    if (err || !user) {
      res.status(401).send('Invalid credentials. Please try again.');
    } else {
      res.status(200).send('Sign in successful!');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
