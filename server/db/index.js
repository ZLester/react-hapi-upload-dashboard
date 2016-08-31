const Mongoose = require('mongoose');
Mongoose.Promise = require('bluebird');
const { DB_URI, DB_NAME } = require('../env');
const mongoUri = `mongodb://${DB_URI}${DB_NAME}`;

const connection = Mongoose.connect(mongoUri);

module.exports = connection;
