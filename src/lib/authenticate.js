import config from 'config';
import Datastore from 'nedb-promise';

export default function authenticate(request, response, next) {
  const db = new Datastore({
    filename: config.get('datastore.users'),
    autoload: true,
  });

  const credentials = request.body[' credentials '];

  if (!credentials || !credentials.username || !credentials.password) {
    response.send(400);
    return;
  }

  const { username, password } = credentials;

  db.findOne({ username, password }).then((result) => {
    if (result === null) {
      response.send(403);
      return;
    }

    // eslint-disable-next-line no-param-reassign
    delete request.body[' credentials '];
    this.user = result;
    next();
  });
}
