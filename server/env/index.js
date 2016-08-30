const Path = require('path');

module.exports = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'dev',
  DB_URI: {
    production: process.env.DB_URI,
    dev: 'mongodb://localhost/hopscotch',
  },
  LANG: process.env.LANG || 'en',
  STATIC_PATH: Path.join(__dirname, '../../dist/'),
  STORAGE_PATH: Path.join(__dirname, '../../dist/images/'),
  RETRIEVAL_PATH: '/images/',
};
