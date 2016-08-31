const Mongoose = require('mongoose');
const Promise = require('bluebird');
const Path = require('path');

const expect = require('chai').expect;
const exec = Promise.promisify(require('child_process').exec);
const request = require('supertest');
const server = require('../server/server.js');
const { users } = require('./fixtures');
const { STORAGE_PATH, DB_URI, DB_NAME } = require('../server/env');

const mongoUri = `mongodb://${DB_URI}${DB_NAME}`;

const getBody = res => JSON.parse(res.text);

const deleteUsers = () => (
  new Promise((resolve, reject) => {
    request(server.listener).del('/api/users')
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
  })
);

const seedDb = users => (
  // Delete all images in /dist/images
  exec(`rm -r ${STORAGE_PATH} && mkdir ${STORAGE_PATH}`)
    .then(() => deleteUsers())
    .then(() => {
      const createUsers = users.map(user => {
        return new Promise((resolve, reject) => {
          request(server.listener).post('/api/users')
            .type('form')
            .field('firstName', user.firstName)
            .field('lastName', user.lastName)
            .field('phoneNumber', user.phoneNumber)
            .attach('image', Path.join(__dirname, '/fixtures', user.imagePath))
            .end((err, res) => {
              if (err) {
                return reject(err);
              }
              resolve(res);
            });
          });
      })
      return Promise.all(createUsers);
    })
);

describe('React/Hapi Dashboard API', () => {
  before(done => {
    if (Mongoose.connection.db) {
      return done();
    }
    Mongoose.connect(mongoUri, done);
  })

  beforeEach(done => {
    server.start(() => {
      seedDb(users)
        .then(() => done());
    });
  });

  afterEach(done => {
    server.stop(() => done())
  })

  describe('/api/users', () => {
    describe('GET', () => {
      it('responds with a 200 (OK)', done => {
        request(server.listener)
          .get('/api/users')
          .expect(200, done);
      });

      it('responds with JSON of all users', done => {
        request(server.listener)
          .get('/api/users')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const retrieved = getBody(res);
            expect(retrieved.length).to.equal(users.length);
            expect(retrieved[0].firstName).to.equal('Bill');
            expect(retrieved[1].firstName).to.equal('Steve');
            expect(retrieved[2].firstName).to.equal('Linus');
            done();
          });
      });

    })
  })
})
