import DbService from '../lib/db-service';

export default class PostService extends DbService {
  constructor(config, db) {
    const collectionName = 'posts';
    super({ collectionName, config, db });
  }
}
