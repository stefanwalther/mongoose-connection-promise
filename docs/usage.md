### Use mongoose-connection-promise in express.js

Connect mongoose to a MongoDB instance using the default settings:

```js

const express = require('express');
const MongooseClient = require('mongoose-connection-promise');

const app = express();

// Initialize using the default settings, which is assuming MongoDB to run
// at mongodb://localhost:27017
const mongooseClient = new MongooseClient();

console.log(mongooseClient.config.host); // Returns localhost
console.log(mongooseClient.config.port): // Returns 27017

mongooseClient.connect()
  .then(connection => {
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


Pass in options:

```js
const MongooseClient = require('mongoose-connection-promise');

const opts = {
  username: 'foo',
  password: 'bar',
  host: 'mongo.local',
  port: 27018,
  debug: true
};

const mongooseClient = new MongooseClient(opts);

mongooseClient.connect()
  .then(connection => {
    // successfully connected
  })
  .catch(err => {
    // an error occurred
  });

```