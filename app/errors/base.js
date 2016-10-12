'use strict'

/**
 * @class
 * @classdesc Base custom error class. Inspired by the "Throw an object" example at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw#Throw_an_object (accessed 2015-08-25)
 * @param {String} message
 */
class CustomError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Error';
    this.stack = new Error().stack;
  }
}

module.exports = CustomError;
