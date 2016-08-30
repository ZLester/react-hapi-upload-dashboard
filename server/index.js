const server = require('./server');
const logger = require('winston');
const { PORT } = require('./env');

server.start(() => logger.info(`Hopscotch Dashboard listening on ${PORT}`));
