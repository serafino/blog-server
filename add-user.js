const argv = require('yargs').argv;

if (!argv.u && !argv.username && !argv.p && !argv.password) {
  console.error('Usage: add-user -u [username] -p [password]');
  console.error('       add-user --username [username] --password [password]');
  process.exit();
}

const username = argv.u || argv.username;
const password = argv.p || argv.password;

const Datastore = require('nedb-promise');

const userDb = new Datastore({
  filename: 'data/users.db',
  autoload: true,
});

userDb.insert({ username, password })
  .then(() => process.exit());
