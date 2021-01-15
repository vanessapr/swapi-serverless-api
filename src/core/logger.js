/* eslint-disable no-console */
class Logger {
  static error(error) {
    console.error(`ERROR :: ${error.stack}`);
  }

  static log(message) {
    console.log(`DEBUG :: ${message}`);
  }
}

module.exports = Logger;
