/* eslint-disable padded-blocks */
import express from 'express';

function createDbRouteHandler(app, service) {
  const router = express.Router(); // eslint-disable-line new-cap

  router.get('/', (request, response) =>
    service.list().then(result => response.json(result)));

  router.get('/:id', (request, response) =>
    service.findOne(request.params.id)
      .then(result => response.json(result)));

  router.post('/', (request, response) =>
    service.save(request.body).then(result =>
      response.json(result)));

  router.put('/:id', (request, response) => {
    const record = request.body;
    const id = request.params.id;

    service.findOne(id).then((findResult) => {
      if (!findResult) {
        response.sendStatus(404);
        return;
      }

      record._id = id; // eslint-disable-line no-underscore-dangle

      service.save(record).then(result =>
        response.json(result));
    });
  });

  router.delete('/:id', (request, response) => {
    const id = request.params.id;

    service.findOne(id).then((findResult) => {
      if (!findResult) {
        response.sendStatus(404);
        return;
      }

      service.remove(id).then(() => response.end());
    });
  });


  router.all('*', (request, response) => response.sendStatus(405));

  app.use(`/${service.collectionName}`, router);
}

export default function createDbRouteHandlers(app, services) {
  for (let i = 0, iLen = services.length; i < iLen; i += 1) {
    createDbRouteHandler(app, services[i]);
  }
}
