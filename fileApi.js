const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');


const mongoURI = 'mongodb+srv://tarun786:u9iYwKPLccHkw6gp@cluster0.wyakcen.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'test';
const collectionName = 'personal_details';



router.get('/file/download', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoURI);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const fileData = await collection.find({}).toArray();
    if (fileData.length === 0) {
      res.status(404).send('No files found');
      return;
    }
    console.log('Successfully downloaded the data from the database');
    // Set the headers for file download
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename="file.txt"`);

    // Send the file data in the response
    res.send(fileData);
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).send('Failed to retrieve files');
  }
});

module.exports = router;

