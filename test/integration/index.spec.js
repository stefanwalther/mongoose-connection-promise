const MongooseConnection = require('./../../index');
const mongoose = require('mongoose');

describe('MongooseConnection', () => {

  function disconnect() {
    mongoose.Promise = global.Promise;
    return mongoose.disconnect();
  }

  beforeEach(() => {
    return disconnect();
  });
  afterEach(() => {
    return disconnect();
  });

  it('ctr => is not connected by default', () => {
    const client = new MongooseConnection();
    expect(client.isConnected()).to.not.exist;
    expect(client.connection).to.not.exist;
  });

  it('ctr => falls back to default options', () => {
    const client = new MongooseConnection();
    expect(client.config).to.exist;
    expect(client.config).to.have.a.property('debug').to.be.false;
    expect(client.config).to.have.a.property('host').to.be.equal('localhost');
    expect(client.config).to.have.a.property('port').to.be.equal(27017);
    expect(client.config).to.have.a.property('database').to.be.empty;
  });

  it('connect => should return a native connection', () => {
    const client = new MongooseConnection();
    return client.connect()
      .then(result => {
        expect(result).to.exist;
        expect(result.constructor.name).to.be.equal('NativeConnection');
        expect(client.isConnected()).to.be.true;
      });
  });

  it('connect => throws an error if connection fails', () => {
    const client = new MongooseConnection({port: 27018});
    return client.connect()
      .catch(err => {
        expect(err).to.exist;
      });
  });

  it('get => returns a connection', () => {
    const client = new MongooseConnection();
    expect(client.config.port).to.be.equal(27017);
    return client.get()
      .then(result => {
        expect(result.constructor.name).to.be.equal('NativeConnection');

        return client.get()
          .then(resultReused => {
            expect(resultReused.constructor.name).to.be.equal('NativeConnection');
          });

      });
  });

  it('disconnects => removes all connections', () => {
    const client = new MongooseConnection();
    return client.get()
      .then(result => {
        expect(client.isConnected()).to.be.true;
        return client.disconnect()
          .then(() => {
            expect(client.isConnected()).to.be.false;
          });
      });
  });

});
