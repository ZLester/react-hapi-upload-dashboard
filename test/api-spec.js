const Mongoose = require('mongoose');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');

const server = require('../server/server.js');

const dbURI = 'mongodb://localhost/hopscotch';

const clearDB = done => {
  Mongoose.connection.collections.users.remove(() => {
    Mongoose.connection.collections.images.remove(done);
  });
};

const stubUsers = [
  {
    firstName: 'Bill',
    lastName: 'Gates',
    phoneNumber: '5554441234',
  },
  {
    firstName: 'Steve',
    lastName: 'Wozniak',
    phoneNumber: '2225551234',
  },
  {
    firstName: 'Linus',
    lastName: 'Torvalds',
    phoneNumber: '3337771234',
  },
];

const stubImages = [
  'fixtures/gates.jpg',
  'fixtures/torvalds.png',
  'fixtures/woz.jpeg',
];