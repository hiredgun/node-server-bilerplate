'use strict';

const ApiProblem = require('api-problem');
const config = require('config');

module.exports = {
  /**
   * Wrapper function for catching async handlers/middlewares exceptions
   *
   * @param {Function} fn - wrapped express middleware
   * @returns {Function}
   */
  catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
  },

  notFound(req, res, next) { // eslint-disable-line
    const status = 404;
    res.status(status).send(new ApiProblem(status));
  },

  badRequest(err, req, res, next) {
    if (!err.status || err.status < 400 || err.status >= 500) {
      return next(err);
    }

    const { status, detail, errors = [] } = err;

    return res.status(err.status).send(new ApiProblem(status, {
      detail,
      errors,
    }));
  },

  development(err, req, res, next) {
    if (config.nodeEnv === 'production') {
      return next(err);
    }
    const status = err.status || 503;

    return res.status(status).send(new ApiProblem(status, {
      detail: err.message,
      stackTrace: err.stack,
    }));
  },

  production(err, req, res, next) { // eslint-disable-line
    const status = 503;
    res.status(status).send(new ApiProblem(status, {
      detail: 'The request couldn\'t be serviced due to some failure within our stack. Try again later.',
    }));
  },
};
