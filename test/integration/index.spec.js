const MongooseClient = require('./../../index');
const mongoose = require('mongoose');

describe('MongooseClient', () => {

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

  it('is not connected by default', () => {
    const client = new MongooseClient();
    expect(client.isConnected()).to.not.exist;
    expect(client.connection).to.not.exist;
  });

  it('falls back to default options', () => {
    const client = new MongooseClient();
    expect(client.config).to.exist;
    expect(client.config).to.have.a.property('debug').to.be.false;
    expect(client.config).to.have.a.property('host').to.be.equal('localhost');
    expect(client.config).to.have.a.property('port').to.be.equal(27017);
    expect(client.config).to.have.a.property('database').to.be.empty;
  });

  it('connects properly', () => {
    const client = new MongooseClient();
    return client.connect()
      .then(result => {
        expect(result).to.exist;
        expect(result.constructor.name).to.be.equal('NativeConnection');
        expect(client.isConnected()).to.be.true;
      });
  });

  it('throws an error if connection fails', () => {
    const client = new MongooseClient({port: 27018});
    return client.connect()
      .catch(err => {
        expect(err).to.exist;
      });
  });

  it('get() returns a connection', () => {
    const client = new MongooseClient();
    expect(client.config.port).to.be.equal(27017);
    return client.get();
  });

});
