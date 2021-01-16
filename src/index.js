const StarshipRepository = require('./domain/repository');
const ApiController = require('./api');

const controller = new ApiController(new StarshipRepository());

module.exports = {
  create: (event) => controller.create(event),
  list: () => controller.list(),
};
