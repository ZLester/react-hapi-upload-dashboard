const mountStaticRoutes = require('../resources/static/staticRoutes.js');
const mountImageRoutes = require('../resources/api/images/imageRoutes.js');
const mountUserRoutes = require('../resources/api/users/userRoutes.js');

module.exports = server => {
  mountImageRoutes(server);
  mountUserRoutes(server);
  mountStaticRoutes(server);
};
