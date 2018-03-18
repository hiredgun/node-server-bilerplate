'use strict';

module.exports = {
  logger: {
    error: {
      file: {
        path: '...', // .log extension will be auto appended
        level: 'error',
      },
      console: {
        level: 'warn',
      },
    },
  },
};
