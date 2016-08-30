const Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');
const { ENV, DB_URI } = require('../env');
const mongoUri = DB_URI[ENV];

const connection = Mongoose.connect(mongoUri);

module.exports = connection;
