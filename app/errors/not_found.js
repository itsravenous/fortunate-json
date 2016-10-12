'use strict';
const BaseError = require('./base');
class NotFoundError extends BaseError {
  constructor(message) {
    super();
    this.message = message || 'Not found';
    this.status = 404;
  }
}

module.exports = NotFoundError;