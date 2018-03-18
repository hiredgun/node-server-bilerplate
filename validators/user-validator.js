'use strict';

const Validator = require('../utils/validator/validator');
const ValidationResult = require('../utils/validator/validation-result');

/**
 * Default available options
 *  - breakChainOnFailure - true/false (default true)
 *
 * @extends {Validator}
 * @param {Object} options
 */
class UserValidator extends Validator {
  /**
   * @inheritdoc
   */
  async validate() {
    // const user = await .... get user from some repository
    // if (!user) {
    //   return new ValidationResult('not found user');
    // }
    return new ValidationResult();
  }
}

module.exports = UserValidator;
