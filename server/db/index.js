const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { ENV, DB_URI } = require('../env');
const mongoUri = DB_URI[ENV];

const connection = mongoose.connect(mongoUri);

module.exports = connection;
