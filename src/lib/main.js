import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';

import createRoutes from '../routes';

module.exports = function createServer(customPort, db) {
  const app = express();
  let port = config.get('port') || 3000;

  if (typeof customPort === 'number') {
    port = customPort;
  }

  app.use(bodyParser.json());
  createRoutes(app, config, db);

  return app.listen(port, () =>
    console.log(`Listening on port ${port}`));
};
