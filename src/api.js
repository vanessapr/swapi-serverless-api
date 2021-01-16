const StarshipEntity = require('./domain/starship');
const { EntryValidationException } = require('./core/exceptions');

class ApiController {
  constructor(repository) {
    this.repository = repository;
  }

  async create(event) {
    const data = JSON.parse(event.body);
    const starship = new StarshipEntity(data);

    try {
      const result = await this.repository.create(starship);

      return {
        statusCode: 201,
        body: JSON.stringify(result),
      };
    } catch (err) {
      if (err instanceof EntryValidationException) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: err.message,
          }),
        };
      }

      throw err;
    }
  }

  async list() {
    const result = await this.repository.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
}

module.exports = ApiController;
