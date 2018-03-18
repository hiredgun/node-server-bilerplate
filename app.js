'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const errorHandlers = require('./utils/error-handlers');
const { fullUrl } = require('./utils/helper-middlewares');
const logger = require('./utils/loggers/loggers');

/**
 * @returns {Object}
 */
module.exports = (/** inject your deps here */) => {
  const app = express();

  // app.use(express.static('public')); uncomment if you want to serve some static files from public dir
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(fullUrl);
  app.use(logger.accessMiddleware);

  app.use('/users', usersRoutes(/** pass your deps here */));
  app.use(errorHandlers.notFound);
  app.use(errorHandlers.badRequest);

  app.use(logger.errorMiddleware);
  app.use(errorHandlers.development);
  app.use(errorHandlers.production);

  return app;
};
