/* eslint-disable class-methods-use-this */
const Logger = require('../core/logger');
const Database = require('../core/database');
const { EntryValidationException } = require('../core/exceptions');

class StarshipRepository {
  async create(starship) {
    try {
      const messages = starship.validate();

      if (messages.length) {
        throw new EntryValidationException(messages.join(', '));
      }

      return await Database.save(starship.toJSON());
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async getAll() {
    try {
      return await Database.getAll();
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}

module.exports = StarshipRepository;
