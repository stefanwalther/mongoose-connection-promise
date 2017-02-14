## mongoose-connection-promise

> Convenience library to connect Mongoose to a MongoDB instance using promises.

[![CircleCI](https://circleci.com/gh/stefanwalther/mongoose-connection-promise/tree/master.svg?style=svg)](https://circleci.com/gh/stefanwalther/mongoose-connection-promise/tree/master)
[![XO code style](https://img.shields.io/badge/code_style-XO--space-5ed9c7.svg)](https://github.com/sindresorhus/xo-space)

<details>

</details>

## Install

Install with [npm](http://npmjs.org/)

```sh
npm install mongoose-connection-promise
```

Install with [yarn](https://yarnpkg.com)

```sh
yarn add mongoose-connection-promise
```

## Use mongoose-connection-promise in express.js

```js
const express = require('express');
const MongooseClient = require('mongoose-connection-promise');
```

## API

### [MongooseClient](lib/index.js#L20)

_MongooseClient_

### [Configuration](lib/index.js#L31)

**Params**

* **{Boolean}**: opts.debug - Whether MongoDB runs in debug mode or not.

### [.constructor()](lib/index.js#L39)

Initialize a new MongooseClient.

**Params**

* **{Object}**: opts - Options to initialize _MongooseClient_.

### [.connect()](lib/index.js#L55)

Connect mongoose to the given instance of MongoDB.

* `returns` **{Promise}**

### [.get()](lib/index.js#L77)

Get an existing connection or create a new one.

In contrary to `.connect()` this method will not create a new connection if MongooseClient is already connected,
but the existing connection will be re-used and returned.

* `returns` **{Promise<NavtiveConnection>}**: Returns the connection to MongoDB.

### [.disconnect()](lib/index.js#L91)

Disconnect mongoose.

* `returns` **{Promise}**

### [.isConnected()](lib/index.js#L102)

Return whether MongooseClient's connection is currently connected and ready to use or not.

* `returns` **{boolean}**

## Author

**Stefan Walther**

* [github/stefanwalther](https://github.com/stefanwalther)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)

## License

Released under the MIT license.

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on February 14, 2017._