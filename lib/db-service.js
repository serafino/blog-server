import Datastore from 'nedb-promise';
import { merge } from 'lodash';

function create(newRecord) {
  return this.db.insert(newRecord);
}

function update(newRecord) {
  const { _id: id } = newRecord;

  if (!id) {
    return Promise.resolve(null);
  }

  return this.db.findOne({ _id: id }).then((result) => {
    if (!result) {
      return null;
    }

    const updatedRecord = merge({}, result, newRecord);
    delete updatedRecord._id; // eslint-disable-line no-underscore-dangle

    return this.db.update({ _id: id }, updatedRecord)
            .then(() => updatedRecord);
  });
}

export default class DbService {
  constructor({ config, collectionName, db }) {
    // eslint-disable-next-line prefer-template
    const datastoreName = 'datastore' +
      (collectionName ? `.${collectionName}` : '');

    const filename = config.get(datastoreName);

    this.db = db || new Datastore({
      filename,
      autoload: true,
      timestampData: true,
    });

    if (collectionName) {
      this.collectionName = collectionName;
    }
  }

  list() {
    return this.db.find({});
  }

  findOne(id) {
    return this.db.findOne({ _id: id });
  }

  save(newRecord) {
    return update.call(this, newRecord).then((result) => {
      if (!result) {
        return create.call(this, newRecord);
      }

      return result;
    });
  }

  remove(id) {
    return this.db.remove({ _id: id });
  }
}
