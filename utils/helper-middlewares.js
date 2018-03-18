'use strict';

exports.fullUrl = (req, res, next) => {
  res.locals.fullUrl = `${req.protocol}://${req.get('host')}${req.path}`;
  return next();
};

