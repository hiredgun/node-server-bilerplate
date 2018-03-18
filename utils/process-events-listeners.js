'use strict';

const debug = require('debug')('NODE');
const { promisify } = require('util');

/**
 * @returns {Object}
 */
exports.initSIGINTListener = (/** add your deps here like DB connections etc. */) =>
  process.on('SIGINT', async () => {
    debug('Received SIGINT - closing all connections...');
    setTimeout(() => { // allow all event listeners to do their job
      debug('All connections closed');
      process.exit(0);
    }, 1000);
  });


process.on('unhandledRejection', (reason) => {
  // will be logged by Winston and the process will exit with a non 0 exit code
  if (reason instanceof Error) {
    throw reason;
  } else {
    throw new Error(reason);
  }
});
