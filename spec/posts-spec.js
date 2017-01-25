/* eslint-env node, jasmine */
/* eslint-disable no-unused-expressions, no-underscore-dangle */
import Datastore from 'nedb-promise';
import request from 'supertest-as-promised';
import { Base64 } from 'js-base64';

import createServer from '../lib/main';
import mockPostData from './mocks/post-data';

describe('/posts endpoint', () => {
  let server;
  let db;
  let testId;

  beforeEach((done) => {
    db = new Datastore({
      autoload: true,
      inMemoryOnly: true,
      timestampData: true,
    });

    db.insert(mockPostData).then((result) => {
      testId = result[0]._id;
      server = createServer(0, db);

      done();
    });
  });

  afterEach(() => {
    server.close();
  });

  it('should create posts', (done) => {
    request(server)
      .post('/posts')
      .set('Authorization', `Basic ${Base64.encode('test:test')}`)
      .send({
        title: 'Another post',
        content: 'Hello world',
      })

      .expect(200)
      .then(() => db.findOne({ title: 'Another post' }))

      .then((result) => {
        expect(result.content).toEqual('Hello world');
        done();
      });
  });

  it('should retrieve a list of posts', (done) => {
    request(server)
      .get('/posts')
      .set('Authorization', `Basic ${Base64.encode('test:test')}`)
      .expect(200)

      .then((response) => {
        const posts = response.body;

        expect(posts).toEqual(jasmine.any(Array));
        expect(posts.length).toEqual(3);

        done();
      });
  });

  it('should retrieve a single post', (done) => {
    request(server)
      .get(`/posts/${testId}`)
      .set('Authorization', `Basic ${Base64.encode('test:test')}`)
      .expect(200)

      .then((response) => {
        const findResult = response.body;
        expect(findResult).not.toBeNull();
        expect(findResult.title).toEqual('First post');

        done();
      });
  });

  it('should explicitly update existing posts', (done) => {
    request(server)
      .put(`/posts/${testId}`)
      .set('Authorization', `Basic ${Base64.encode('test:test')}`)
      .send({ title: '1st Post' })
      .expect(200)
      .then(() => db.findOne({ _id: testId }))

      .then((result) => {
        expect(result.title).toEqual('1st Post');
        expect(result.content).toEqual('This is my first post.');

        done();
      });
  });

  it('should implicitly update existing posts', (done) => {
    request(server)
      .post('/posts')
      .set('Authorization', `Basic ${Base64.encode('test:test')}`)
      .send({ _id: testId, title: 'Hello, world!' })

      .expect(200)
      .then(() => db.findOne({ _id: testId }))

      .then((result) => {
        expect(result.title).toEqual('Hello, world!');
        expect(result.content).toEqual('This is my first post.');

        done();
      });
  });

  it('should delete existing posts', (done) => {
    request(server)
      .del(`/posts/${testId}`)
      .set('Authorization', `Basic ${Base64.encode('test:test')}`)
      .expect(200)
      .then(() => db.findOne({ _id: testId }))

      .then((result) => {
        expect(result).toBeNull();
        done();
      });
  });
});
