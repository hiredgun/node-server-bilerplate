'use strict';

const { Transport } = require('winston');

module.exports = class NullTransport extends Transport {
  constructor() {
    super({
      name: 'null-transport',
      level: 'error',
    });
  }
  log(level, msg, meta, callback) { // eslint-disable-line class-methods-use-this
    callback(null);
  }
};
