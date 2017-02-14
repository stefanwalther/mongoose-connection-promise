const MongooseConnection = require('./../../index');

describe('Unit tests', () => {

  it('_getMongoUri_UserPwd => returns and empty string by default', () => {
    const client = new MongooseConnection();
    expect(client._getMongoUri_UserPwd()).to.be.equal('');
  });

  it('_getMongoUri_UserPwd => returns and empty string if only either username or password is set', () => {
    const client = new MongooseConnection();
    client.config.username = 'foo';
    expect(client._getMongoUri_UserPwd()).to.be.equal('');
    client.config.username = '';
    client.config.password = 'bar';
    expect(client._getMongoUri_UserPwd()).to.be.equal('');
  });

  it('_getMongoUri_UserPwd => returns the user-pwd', () => {
    const client = new MongooseConnection();
    client.config.username = 'foo';
    client.config.password = 'bar';
    expect(client._getMongoUri_UserPwd()).to.be.equal('foo:bar@');
  });

  it('_getMongoUri_Database => returns an empty string by default', () => {
    const client = new MongooseConnection();
    client.config.database = '';
    expect(client._getMongoUri_Database()).to.be.equal('');
  });

  it('_getMongoUri_Database => returns the database as defined', () => {
    const client = new MongooseConnection();
    client.config.database = 'foobarbaz';
    expect(client._getMongoUri_Database()).to.be.equal('/foobarbaz');
  });

});
