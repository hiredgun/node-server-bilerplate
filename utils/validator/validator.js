'use strict';

/**
 * Base validator class
 *
 * Default available options
 *  - breakChainOnFailure - true/false (default true)
 *
 * @class Validator
 * @param {Object} options
 */
class Validator {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * @abstract
   * @param {...*} [value]
   * @returns {ValidationResult}
   */
  validate() { // eslint-disable-line
    throw new Error(`"validate" method is abstract and therefore should be implemented by ${this.constructor.name} class`);
  }

  /**
   * Indicates whether validation failure should stop farther validation
   *
   * @returns {Boolean}
   */
  breakChainOnFailure() {
    return this.options.breakChainOnFailure ? this.options.breakChainOnFailure : true;
  }
}

module.exports = Validator;
