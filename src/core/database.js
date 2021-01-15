const AWS = require('aws-sdk');
const Logger = require('./logger');
const { DatabaseException } = require('./exceptions');

class Database {
  constructor() {
    this.client = new AWS.DynamoDB.DocumentClient();
  }

  save(data) {
    return new Promise((resolve, reject) => {
      this.client.put({ TableName: process.env.STARSHIP_TABLE, Item: data }, (error) => {
        if (error) {
          Logger.error(error);
          Logger.log(`Data received: ${JSON.stringify(data, null, 2)}`);
          reject(new DatabaseException('Unable to save the item in the database'));

          return;
        }

        resolve(data);
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.client.scan({ TableName: process.env.STARSHIP_TABLE }, (error, result) => {
        if (error) {
          Logger.error(error);
          reject(new DatabaseException("Couldn't fetch the registers"));

          return;
        }

        resolve(result.Items);
      });
    });
  }
}

module.exports = new Database();
