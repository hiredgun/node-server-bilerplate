'use strict';

const ValidationError = require('../../errors/validation-error');
const UserValidator = require('../user-validator');

exports.get = (req, res, next) => {
  const { id } = req.params;
  const userValidator = new UserValidator();

  const result = userValidator.validate();

  if (!result.isValid()) {
    return next(new ValidationError(result.getErrors()));
  }

  return next();
};

exports.patch = exports.get;
