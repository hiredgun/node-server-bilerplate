'use strict';

/**
 * @class ValidationError
 * @extends {Error}
 * @param {Object[]} [errors=[]]
 * @param {String} [detail=There were errors during validation]
 * @param {Number} [status=400]
 */
class ValidationError extends Error {
  constructor(errors = [], detail = 'There were errors during validation', status = 400) {
    super();
    this.status = status;
    this.detail = detail;
    if (!Array.isArray(errors)) {
      this.errors = [errors];
    } else {
      this.errors = errors;
    }
  }

  /**
   * @param {Object} error
   * @returns {this}
   */
  addError(error) {
    this.errors.push(error);
    return this;
  }
}

module.exports = ValidationError;
