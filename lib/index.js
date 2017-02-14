const mongoose = require('mongoose');

const envOpts = {};

const defaultOpts = {
  debug: false,
  host: 'localhost',
  port: 27017,
  database: ''
};

class MongooseClient {

  constructor(opts) {

    this.config = Object.assign(envOpts, defaultOpts, opts);
    this.connection = null;

    mongoose.Promise = global.Promise;

  }

  /**
   * Connect mongoose to the given instance of MongoDB.
   * @returns {*|MongooseThenable}
   */
  connect() {
    return new Promise((resolve, reject) => {
      const options = {}; // Todo: Make server connections configurable
      if (!this.connection) {
        this.connection = mongoose.connection;
      }
      mongoose.connect(this._getMongoUri(), options)
        .then(() => resolve(this.connection))
        .catch(err => reject(err));
    });
  }

  get() {
    if (this.isConnected()) {
      return Promise.resolve(this.connection);
    }
    return this.connect();
  }

  disconnect() {
    return mongoose.disconnect();
  }

  isConnected() {
    return this.connection && this.connection.readyState === 1;
  }

  _getMongoUri() {
    let c = 'mongodb://';
    c += this._getMongoUri_UserPwd();
    c += this._getMongoUri_Hosts();
    c += this._getMongoUri_Db();
    return c;
  }

  _getMongoUri_UserPwd() {
    return (this.config.username && this.config.password) ? this.config.username + ':' + this.config.password + '@' : '';
  }

  _getMongoUri_Hosts() {
    // Todo: Allow multiple hosts according to https://docs.mongodb.com/manual/reference/connection-string/
    return this.config.host + ':' + this.config.port;
  }

  _getMongoUri_Db() {
    return (this.config.database) ? `/${this.config.database}` : '';
  }

}

module.exports = MongooseClient;
