## Use mongoose-connection-promise in express.js

Connect mongoose

```js

const express = require('express');
const MongooseClient = require('mongoose-connection-promise');

const app = express();

const mongooseClient = new MongooseClient();

// Connect using the default settings, which is assuming MongoDB to run
// at mongodb://localhost:27017
mongooseClient.connect()
  .then( connection => {
    app.db = connection;
    const port = 3003;
    app.listen(port, err => {
      if (err) {
        console.log('Could not start express server');
      } else {
        console.log(`Express server started at port ${port}`);
      }
    });
  })
  .catch(err => {
    console.log('Error creating a mongoose connection', err);
  });

```