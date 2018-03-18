'use strict';

module.exports = {
  logger: {
    access: {
      file: {
        path: '...', // .log extension will be auto appended
        level: 'info',
      },
    },
    error: {
      file: {
        path: '...', // .log extension will be auto appended
        level: 'warn',
      },
      console: {
        level: 'warn',
      },
    },
  },
};
