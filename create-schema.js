const Datastore = require('nedb-promise');

const userDb = new Datastore({
  filename: 'data/users.db',
  autoload: true,
});

userDb.insert({ username: 'test', password: 'test' })
  .then(() => process.exit());
