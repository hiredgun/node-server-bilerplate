'use strict';

const ValidationResult = require('./validation-result');

/**
 * Runs validators collection
 *
 * @class ValidatorsChain
 * @param {Validator[]} validators - array of Validators instances
 */
class ValidatorsChain {
  constructor(validators = []) {
    if (!Array.isArray(validators)) {
      this.validators = [validators];
    } else {
      this.validators = validators;
    }
  }

  /**
   * Adds concrete validator to the validators chain
   *
   * @param {Validator} validator
   * @returns {This}
   */
  add(validator) {
    this.validators.push(validator);

    return this;
  }

  /**
   * Executes validation chain
   *
   * @returns {Promise.<ValidationResult>}
   */
  async validate() {
    const results = [];

    for (const validator of this.validators) { // eslint-disable-line
      const validationResult = await validator.validate(); // eslint-disable-line

      results.push(validationResult);
      if (!validationResult.isValid() && validator.breakChainOnFailure()) {
        break;
      }
    }

    const chainValidationResult = new ValidationResult();

    results.forEach((result) => {
      if (!result.isValid()) {
        chainValidationResult.addError(result.getErrors());
      }
    });

    return chainValidationResult;
  }
}

module.exports = ValidatorsChain;
