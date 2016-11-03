import { expect } from 'chai';
import Datastore from 'nedb-promise';
import request from 'supertest-as-promised';

import createServer from '../dist/lib/main';

describe('/posts endpoint', () => {
  let server;
  let db;

  beforeEach(() => {
    db = new Datastore({
      autoload: true,
      inMemoryOnly: true,
      timestampData: true,
    });

    server = createServer(0, db);
  });

  it('should create posts', done => {
    request(server)
      .post('/posts')
      .send({ data: 'Hello world' })
      .expect(200)

      .then(() => db.findOne({ data: 'Hello world' }))

      .then(result => {
        expect(result.data).to.equal('Hello world');
        done();
      });
  });

  it('should retrieve a list of posts', done => {
    db.insert([{ index: 1 }, { index: 2 }, { index: 3 } ])
      .then(() => request(server)
        .get('/posts')
        .expect(200))

      .then(response => {
        const posts = response.body;

        expect(posts).to.be.an('array');
        expect(posts.length).to.equal(3);

        done();
      });
  });

  it('should retrieve a single post', done => {
    db.insert({ index: 1 })
      .then(post => request(server)
        .get(`/posts/${post._id}`)
        .expect(200))

      .then(response => {
        const findResult = response.body;
        expect(findResult.index).to.equal(1);

        done();
      });
  });

  it('should explicitly update existing posts', done => {
    db.insert({ index: 1, title: 'Hello world' })
      .then(post => request(server)
        .put(`/posts/${post._id}`)
        .send({ title: 'Hello, world!' })
        .expect(200))

      .then(response => {
        const result = response.body;
        expect(result.title).to.equal('Hello, world!');
        expect(result.index).to.equal(1);

        done();
      });
  });

  it('should implicitly update existing posts', done => {
    db.insert({ index: 1, title: 'Hello world' })
      .then(post => request(server)
        .post('/posts')
        .send({ _id: post._id, title: 'Hello, world!' })
        .expect(200))

      .then(response => {
        const result = response.body;
        expect(result.title).to.equal('Hello, world!');
        expect(result.index).to.equal(1);

        done();
      });
  });

  it('should delete existing posts', done => {
    db.insert({ index: 1, title: 'Hello world' })
      .then(post => request(server)
        .del(`/posts/${post._id}`)
        .expect(200)

        .then(() => db.findOne({ _id: post._id }))

        .then(result => {
          expect(result).to.be.null;
          done();
        }));
  });
});
