'use strict';

/**
 * @class RuntimeError
 * @extends {Error}
 * @param {String} detail
 * @param {Number} [status=503]
 */
class RuntimeError extends Error {
  constructor(message, status = 503) {
    if (message instanceof Error) {
      super(message.message);
      this.stack = message.stack;
      this.status = status || message.status;
    } else {
      super(message);
      this.status = status;
    }
  }
}

module.exports = RuntimeError;
