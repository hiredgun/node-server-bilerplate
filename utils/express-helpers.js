'use strict';

const debug = require('debug')('NODE');
const config = require('config');

/**
 * Event listener for HTTP server "listening" event.
 * @param {Object} server
 * @returns {Function}
 */
exports.onListening = server => () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`ENV: ${config.nodeEnv}`);
  debug(`Listening on ${bind}`);
};

/**
 * Event listener for HTTP server "error" event.
 * @param {Any} port
 * @returns {Function}
 */
exports.onError = port => (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`); // eslint-disable-line
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`); // eslint-disable-line
      process.exit(1);
      break;
    default:
      throw error;
  }
};
