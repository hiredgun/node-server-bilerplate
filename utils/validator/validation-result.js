'use strict';

/**
 * Provides a common way of handling validation results
 *
 * @class ValidationResult
 * @param {Boolean} valid - validation flag true|false
 * @param {*} errors
 */
class ValidationResult {
  constructor(errors = []) {
    if (!Array.isArray(errors)) {
      this.errors = [errors];
    } else {
      this.errors = errors;
    }
  }

  /**
   * @returns {Boolean}
   */
  isValid() {
    return this.errors.length === 0;
  }

  /**
   * @returns {Array}
   */
  getErrors() {
    return this.errors;
  }

  /**
   * @param {Object} error
   * @returns {this}
   */
  addError(error) {
    if (!Array.isArray(error)) {
      this.errors.push(error);
    } else {
      this.errors.push(...error);
    }
    return this;
  }
}

module.exports = ValidationResult;
