## mongoose-connection-promise

> Convenience library to connect Mongoose to a MongoDB instance using promises.

[![NPM version](https://img.shields.io/npm/v/mongoose-connection-promise.svg?style=flat)](https://www.npmjs.com/package/mongoose-connection-promise)
[![David](https://img.shields.io/david/stefanwalther/mongoose-connection-promise.svg)](https://github.com/stefanwalther/mongoose-connection-promise)
[![CircleCI](https://img.shields.io/circleci/project/github/stefanwalther/mongoose-connection-promise.svg)](https://circleci.com/gh/stefanwalther/mongoose-connection-promise/tree/master)
[![codecov](https://codecov.io/gh/stefanwalther/mongoose-connection-promise/branch/master/graph/badge.svg)](https://codecov.io/gh/stefanwalther/mongoose-connection-promise)
[![Greenkeeper badge](https://badges.greenkeeper.io/stefanwalther/mongoose-connection-promise.svg)](https://greenkeeper.io/)
[![XO code style](https://img.shields.io/badge/code_style-XO--space-5ed9c7.svg)](https://github.com/sindresorhus/eslint-config-xo-space)

***

**Note:** With the introduction of mongoose > 5.x this library becomes obsolete as the handling of connections has been greatly improved in mongoose > 5.x.
[Read here](http://thecodebarbarian.com/whats-new-in-mongoose-5-improved-connections.html) for a good summary of the changes/improvements introduced.

Therefore this library will not be updated for mongoose > 5.x.

***

## Table of Contents

<details>

- [Install](#install)
- [Motivation](#motivation)
- [Usage](#usage)
- [API](#api)
- [Test](#test)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

</details>

## Install

Install with [npm](http://npmjs.org/)
```sh
$ npm install mongoose-connection-promise
```

Install with [yarn](https://yarnpkg.com)
```sh
$ yarn add mongoose-connection-promise
```

## Motivation

Although mongoose does not force you to wait until a mongoose connection has been created, the author of this module prefers to not start with any application before we know that a connection has been established successfully.

_mongoose-connection-promise_ helps connecting and disonnecting to MongoDB in mongoose reliably.

## Usage

### Use mongoose-connection-promise in express.js

Connect mongoose to a MongoDB instance using the default settings:

```js

const express = require('express');
const MongooseConnection = require('mongoose-connection-promise');

const app = express();

// Initialize using the default settings, which is assuming MongoDB to run
// at mongodb://localhost:27017
const mongooseConnection = new MongooseConnection();

console.log(mongooseConnection.config.host); // Returns localhost
console.log(mongooseConnection.config.port): // Returns 27017

mongooseConnection.connect()
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
const MongooseConnection = require('mongoose-connection-promise');

const opts = {
  username: 'foo',
  password: 'bar',
  host: 'mongo.local',
  port: 27018,
  debug: true
};

const mongooseConnection = new MongooseConnection(opts);

mongooseConnection.connect()
  .then(connection => {
    // successfully connected
  })
  .catch(err => {
    // an error occurred
  });

```

## API

### [Configuration](lib/index.js#L81)

Define a configuration object to pass to the constructor.

If no options are defined, the default options will be used:
See [index.js => defaultOpts](index.js) for more information about the current default options.

**Params**

* `opts` **{Object}**: Options to pass in.
* `opts.debug` **{Boolean}**: Whether MongoDB runs in debug mode or not.
* `opts.host` **{String}**: The MongoDBhost, defaults to `localhost`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
* `opts.port` **{Number}**: The MongoDB port, defaults to `27017`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
* `opts.database` **{String}**: The MongoDB database, defaults to `admin`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
* `opts.connectOptions` **{Object}**: The MongoDB connection properties, being passed through to the native MongoDB driver. See [mongoose' documentation](http://mongoosejs.com/docs/connections.html), resp. [MongoDB's native driver for node.js' documentation](https://github.com/mongodb/node-mongodb-native) for more details.

**Example**

```js
// Default Options:
const defaultOpts = {
   debug: false,
   host: 'localhost',
   port: 27017,
   database: '',
   connectOptions: {
     db: {},
     server: {
       auto_reconnect: true
     },
     replset: {},
     user: {},
     pass: {},
     auth: {},
     mongos: {}
   }
};
```

### [.constructor()](lib/index.js#L90)

Initialize a new MongooseConnection.

**Params**

* **{Configuration}**: opts - Options to initialize _MongooseConnection_.

### [.DEFAULT_CONFIG](lib/index.js#L102)

Returns the default options of mongoose-connection-promise

### [.connect()](lib/index.js#L115)

Connect mongoose to the given instance of MongoDB.

* `returns` **{Promise}**

### [.get()](lib/index.js#L137)

Get an existing connection or create a new one.

In contrary to `.connect()` this method will not create a new connection if MongooseConnection is already connected,
but the existing connection will be re-used and returned.

* `returns` **{Promise<NavtiveConnection,Error>}**: Returns the connection to MongoDB.

### [.disconnect()](lib/index.js#L151)

Disconnects all mongoose connections.

* `returns` **{Promise<void,Error>}**

### [.isConnected()](lib/index.js#L162)

Indicates whether there is a current and ready-to-use mongoose connection.

* `returns` **{boolean}**

### [.defaultOptions()](lib/index.js#L174)

Return the default options (DEPRECATED).

* `returns`: object

## Test

Start the MongoDB docker container:

```sh
$ npm run dc-dev-up
```

Then run the tests:

```
$ npm run test
```

## Author

**Stefan Walther**

* [github/stefanwalther](https://github.com/stefanwalther)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)

## License

MIT

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on February 22, 2018._