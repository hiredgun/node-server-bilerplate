'use strict';

module.exports = () => ({
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Promise.<ServerResponse>}
   */
  get(req, res, next) {
    return res.json({ foo: 'bar' });
  },
});
