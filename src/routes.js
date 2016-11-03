import createDbRouteHandlers from './lib/db-route-handler';
import PostService from './services/post-service';

export default function createRoutes(app, config, db) {
  createDbRouteHandlers(app, [
    new PostService(config, db),
  ]);
}
