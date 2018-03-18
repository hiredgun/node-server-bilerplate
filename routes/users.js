'use strict';

const express = require('express');
const createUsersController = require('../controllers/users');
const { catchErrors } = require('../utils/error-handlers');

/**
 * @returns {Router}
 */
module.exports = () => {
  const router = express.Router();
  const usersController = createUsersController();

  router.get(
    '/:id',
    // add your middlewares here
    catchErrors(usersController.get),
  );

  return router;
};
