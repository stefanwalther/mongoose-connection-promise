const mongoose = require('mongoose');

const envOpts = {};

// Todo: Extend documentation with links where to find these options.
const DEFAULT_CONFIG = {
  debug: false,
  host: 'localhost',
  port: 27017,
  database: '',
  connectOptions: {
    db: {},
    server: {
      auto_reconnect: true,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    },
    user: {},
    pass: {},
    auth: {},
    mongos: {}
  }
};

/**
 * @class MongooseConnection
 * @name MongooseConnection
 * @api public
 */
class MongooseConnection {

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
   *    port: 27017,
   *    database: '',
   *    connectOptions: {
   *      db: {},
   *      server: {
   *        auto_reconnect: true
   *      },
   *      replset: {},
   *      user: {},
   *      pass: {},
   *      auth: {},
   *      mongos: {}
   *    }
   * };
   * ```
   * See [index.js => defaultOpts](index.js) for more information about the current default options.
   *
   *
   * @name Configuration
   *
   * @param {Object} `opts` - Options to pass in.
   * @param {Boolean} `opts.debug` - Whether MongoDB runs in debug mode or not.
   * @param {String} `opts.host` - The MongoDBhost, defaults to `localhost`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   * @param {Number} `opts.port` - The MongoDB port, defaults to `27017`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   * @param {String} `opts.database` - The MongoDB database, defaults to `admin`.  See the mongodb [connection string spec](https://docs.mongodb.com/manual/reference/connection-string/) for more details.
   * @param {Object} `opts.connectOptions` - The MongoDB connection properties, being passed through to the native MongoDB driver. See [mongoose' documentation](http://mongoosejs.com/docs/connections.html), resp. [MongoDB's native driver for node.js' documentation](https://github.com/mongodb/node-mongodb-native) for more details.
   *
   * @api public
   */

  /**
   * Initialize a new MongooseConnection.
   *
   * @name .constructor()
   * @constructor
   * @param {Configuration} opts - Options to initialize _MongooseConnection_.
   * @api public
   */
  constructor(opts) {

    this.config = Object.assign(envOpts, DEFAULT_CONFIG, opts);
    this.connection = null;

    /**
     * Returns the default options of mongoose-connection-promise
     *
     * @name DEFAULT_CONFIG
     * @type object
     * @api public
     */
    this.DEFAULT_CONFIG = DEFAULT_CONFIG;

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
      const options = {useMongoClient: true}; // Todo: Make server connections configurable
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
   * In contrary to `.connect()` this method will not create a new connection if MongooseConnection is already connected,
   * but the existing connection will be re-used and returned.
   *
   * @name .get()
   * @returns {Promise<NavtiveConnection,Error>} - Returns the connection to MongoDB.
   * @api public
   */
  get() {
    if (this.isConnected()) {
      return Promise.resolve(this.connection);
    }
    return this.connect();
  }

  /**
   * Disconnects all mongoose connections.
   *
   * @name .disconnect()
   * @returns {Promise<void,Error>}
   * @api public
   */
  disconnect() {
    return mongoose.disconnect();
  }

  /**
   * Indicates whether there is a current and ready-to-use mongoose connection.
   *
   * @name .isConnected()
   * @returns {boolean}
   * @api public
   */
  isConnected() {
    return this.connection && this.connection.readyState === 1;
  }

  /**
   * Return the default options (DEPRECATED).
   *
   * @name .defaultOptions()
   * @returns object
   * @api public
   * @deprecated
   */
  defaultOptions() {
    console.error('.defaultOptions() is deprecated, use .DEFAULT_OPTIONS instead.');
    return DEFAULT_CONFIG;
  }

  /* -------------------------------------------------------------------------------------- */
  /* INTERNAL HELPER METHODS                                                                */
  /* -------------------------------------------------------------------------------------- */
  _getMongoUri() {
    let c = 'mongodb://';
    c += this._getMongoUri_UserPwd();
    c += this._getMongoUri_Hosts();
    c += this._getMongoUri_Database();
    return c;
  }

  _getMongoUri_UserPwd() {
    return (this.config.username && this.config.password) ? this.config.username + ':' + this.config.password + '@' : '';
  }

  _getMongoUri_Hosts() {
    // Todo: Allow multiple hosts according to https://docs.mongodb.com/manual/reference/connection-string/
    return this.config.host + ':' + this.config.port;
  }

  _getMongoUri_Database() {
    return (this.config.database) ? `/${this.config.database}` : '';
  }

}

module.exports = MongooseConnection;
