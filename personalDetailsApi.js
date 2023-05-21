const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb+srv://tarun786:u9iYwKPLccHkw6gp@cluster0.wyakcen.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Define the data model for personal_details collection
const personalDetailsSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const PersonalDetails = mongoose.model('personal_details', personalDetailsSchema);

// API route to add a document to the personal_details collection
router.post('/personal_details', (req, res) => {
  const { name, age, email } = req.body;

  const personalDetails = new PersonalDetails({
    name: name,
    age: age,
    email: email
  });

  personalDetails.save()
    .then(() => {
      res.send('Document saved successfully');
    })
    .catch((error) => {
      res.status(500).send('Failed to save document');
    });
});

module.exports = router;
