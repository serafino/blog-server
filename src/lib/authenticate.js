import basicAuth from 'basic-auth';
import config from 'config';
import Datastore from 'nedb-promise';

export default function authenticate(request, response, next) {
  const credentials = basicAuth(request);

  if (!credentials) {
    response.sendStatus(401);
    response.setHeader('WWW-Authenticate', 'Basic realm="blog-server"');
    response.send('UNAUTHORIZED');
    return;
  }

  const userDb = new Datastore({
    filename: config.get('datastore.users'),
    autoload: true,
  });

  const { name: username, pass: password } = credentials;

  userDb.findOne({ username, password })
    .then((result) => {
      if (!result) {
        response.sendStatus(403);
        return;
      }

      request.user = result;
      next();
    });
}
