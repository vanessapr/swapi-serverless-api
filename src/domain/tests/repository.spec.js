const sinon = require('sinon');
const chai = require('chai');

const Database = require('../../core/database');
const Starship = require('../starship');
const StarshipRepository = require('../repository');
const data = require('./starships.json');
const { EntryValidationException, DatabaseException } = require('../../core/exceptions');

const { expect } = chai;

describe('Starship Repository', () => {
  describe('Create', () => {
    let newStarship;

    beforeEach(() => {
      [newStarship] = data;
    });

    it('Should add a new starship to the db', async () => {
      const stub = sinon.stub(Database, 'save').returns(newStarship);
      const starship = new Starship(newStarship);
      const repository = new StarshipRepository();
      const result = await repository.create(starship);

      expect(stub.calledOnce).to.be.true;
      expect(result.nombre).to.equal(newStarship.nombre);
      expect(result.modelo).to.equal(newStarship.modelo);
    });

    it('Should throw an EntryValidationException when the required fields are missing', async () => {
      delete newStarship.nombre;
      const starship = new Starship(newStarship);
      const repository = new StarshipRepository();

      try {
        await repository.create(starship);
      } catch (err) {
        expect(err).to.be.instanceOf(EntryValidationException);
        expect(err.message).to.equal('The name field is invalid');
      }
    });
  });

  describe('Get All', () => {
    let stub;

    beforeEach(() => {
      stub = sinon.stub(Database, 'getAll');
    });

    afterEach(() => {
      stub.restore();
    });

    it('Should returns starships list', async () => {
      stub.returns(data);
      const repository = new StarshipRepository();
      const result = await repository.getAll();

      expect(stub.calledOnce).to.be.true;
      expect(result).to.length(3);
    });

    it('Should throws an DatabaseException exception when there are issues with the db', async () => {
      stub.throws(new DatabaseException('Unable to connect to the database'));
      const repository = new StarshipRepository();

      try {
        await repository.getAll();
      } catch (err) {
        expect(err).to.be.instanceOf(DatabaseException);
        expect(err.message).to.equal('Unable to connect to the database');
      }

      expect(stub.calledOnce).to.be.true;
    });
  });
});
