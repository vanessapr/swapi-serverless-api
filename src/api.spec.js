const sinon = require('sinon');
const chai = require('chai');

const ApiController = require('./api');
const StarshipRepository = require('./domain/repository');
const data = require('./domain/tests/starships.json');
const { EntryValidationException } = require('./core/exceptions');

const { expect } = chai;

describe('Api Tests', () => {
  describe('Create', () => {
    let stub;
    let controller;

    beforeEach(() => {
      const repository = new StarshipRepository();

      controller = new ApiController(repository);
      stub = sinon.stub(repository, 'create');
    });

    afterEach(() => {
      stub.restore();
    });

    it('Should returns 201 status when the item was successful created', async () => {
      stub.returns(data[0]);
      const result = await controller.create({ body: JSON.stringify(data[0]) });

      expect(result.statusCode).to.equal(201);
      expect(stub.calledOnce).to.be.true;
    });

    it('Should returns 400 status when a required field is missing', async () => {
      stub.throws(new EntryValidationException('The name field is invalid'));
      const result = await controller.create({ body: JSON.stringify(data[0]) });

      expect(result.statusCode).to.equal(400);
      expect(result.body).to.equal(JSON.stringify({ message: 'The name field is invalid' }));
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('List', () => {
    let stub;
    let controller;

    beforeEach(() => {
      const repository = new StarshipRepository();

      controller = new ApiController(repository);
      stub = sinon.stub(repository, 'getAll');
    });

    afterEach(() => {
      stub.restore();
    });

    it('Should returns 200 status', async () => {
      stub.returns(data);
      const result = await controller.list();

      expect(result.statusCode).to.equal(200);
      expect(result.body).to.equal(JSON.stringify(data));
    });
  });
});
