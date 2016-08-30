const server = require('./server');
const logger = require('winston');

const { PORT } = require('./env');

server.start(() => logger.info(`React/Hapi Dashboard listening on ${PORT}`));
