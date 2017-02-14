const mongoose = require('mongoose');

const envOpts = {};

const defaultOpts = {
  debug: false,
  host: 'localhost',
  port: 27017,
  database: ''
};

/**
 * _MongooseClient_
 *
 *
 * @name MongooseClient
 * @api public
 */
class MongooseClient {

  /**
   * Define a configuration object to pass to the constructor.
   *
   * If no options are defined, the default options will be used:
   *
   *
   * ```js
   * // Default Options:
   * const defaultOpts = {
   *    debug: false,
   *    host: 'localhost',
   *    port: 27mon017,
   *    database: ''
   * };
   * ```
   *
   * @name Configuration
   *
   * @param {Object} `opts` - Options to pass in.
   * @param {Boolean} `opts.debug` - Whether MongoDB runs in debug mode or not.
   * @param {String} `opts.host` - The MongoDB host, defaults to `localhost`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   * @param {Number} `opts.port` - The MongoDB port, defaults to `27017`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   * @param {String} `opts.database` - The MongoDB database, defaults to `admin`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   *
   * @api public
   *
   */

  /**
   * Initialize a new MongooseClient.
   *
   * @name .constructor()
   * @param {Object} opts - Options to initialize _MongooseClient_.
   * @api public
   */
  constructor(opts) {

    this.config = Object.assign(envOpts, defaultOpts, opts);
    this.connection = null;

    mongoose.Promise = global.Promise;

  }

  /**
   * Connect mongoose to the given instance of MongoDB.
   *
   * @name .connect()
   * @returns {Promise}
   * @api public
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

  /**
   * Get an existing connection or create a new one.
   *
   * In contrary to `.connect()` this method will not create a new connection if MongooseClient is already connected,
   * but the existing connection will be re-used and returned.
   *
   * @name .get()
   * @returns {Promise<NavtiveConnection>} - Returns the connection to MongoDB.
   * @api public
   */
  get() {
    if (this.isConnected()) {
      return Promise.resolve(this.connection);
    }
    return this.connect();
  }

  /**
   * Disconnect mongoose.
   *
   * @name .disconnect()
   * @returns {Promise}
   * @api public
   */
  disconnect() {
    return mongoose.disconnect();
  }

  /**
   * Return whether MongooseClient's connection is currently connected and ready to use or not.
   *
   * @name .isConnected()
   * @returns {boolean}
   * @api public
   */
  isConnected() {
    return this.connection && this.connection.readyState === 1;
  }

  /* -------------------------------------------------------------------------------------- */
  /* INTERNAL HELPER METHODS                                                                */
  /* -------------------------------------------------------------------------------------- */
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
