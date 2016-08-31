const Path = require('path');

module.exports = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'dev',
  DB_URI: process.env.MONGO || 'localhost',
  DB_NAME: process.env.DB_NAME || '/reacthapidashboard',
  LANG: process.env.LANG || 'en',
  STATIC_PATH: Path.join(__dirname, '../../dist/'),
  STORAGE_PATH: Path.join(__dirname, '../../dist/images/'),
  RETRIEVAL_PATH: '/images/',
};
