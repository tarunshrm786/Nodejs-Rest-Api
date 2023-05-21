const express = require('express');
const fileApi = require('./fileApi');
const personalDetailsApi = require('./personalDetailsApi');

const app = express();

// Mount the file API router
app.use('/', fileApi);

// Mount the personal details API router
app.use('/api', personalDetailsApi);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
