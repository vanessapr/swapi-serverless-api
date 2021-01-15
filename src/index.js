const ApiController = require('./api');

module.exports = {
  create: (event) => ApiController.create(event),
  list: () => ApiController.list(),
};
