const { LANG } = require('../../env');

const errors = {
  500: {
    en: 'Internal Server Error',
    de: 'Interner Serverfehler',
  },
  404: {
    en: 'Not Found',
    de: 'Nicht Gefunden',
  },
};

const messages = {
  500: {
    en: 'There was an internal server error while processing your request.',
    de: 'Es ist ein interner Serverfehler während der Bearbeitung Ihrer Anfrage.',
  },
  404: {
    en: 'The requested resource could not be found.',
    de: 'Die angeforderte Ressource konnte nicht gefunden werden.',
  },
};

exports.internal = {
  statusCode: 500,
  error: errors[500][LANG],
  message: messages[500][LANG],
};

exports.notFound = {
  statusCode: 404,
  error: errors[404][LANG],
  message: messages[404][LANG],
};
