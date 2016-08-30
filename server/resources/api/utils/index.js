const logger = require('winston');

exports.handleResponse = (reply, replyBody, code = 200) => reply(replyBody).code(code);

exports.handleError = (reply, replyBody, errCode, err) => {
  if (err) {
    logger.error(err);
  }
  reply(replyBody).code(errCode);
};
