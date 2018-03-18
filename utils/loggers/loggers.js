'use strict';

const winston = require('winston');
const config = require('config');
const moment = require('moment');
const expressWinston = require('express-winston');
const NullTransport = require('./null-transport');
require('winston-daily-rotate-file');

let accessMiddleware = (req, res, next) => { next(); };
let errorMiddleware = (err, req, res, next) => { next(err); };
const mainLogger = new (winston.Logger)({
  transports: [new NullTransport()],
});


const accessTransports = [];
const errorTransports = [];

function timestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

// TODO get rid of transports duplication
if (config.has('logger.access.console')) {
  accessTransports.push(new winston.transports.Console({
    json: false,
    timestamp,
    colorize: true,
    level: config.get('logger.access.console.level'),
  }));
}

if (config.has('logger.error.console')) {
  errorTransports.push(new winston.transports.Console({
    json: false,
    timestamp,
    colorize: true,
    level: config.get('logger.error.console.level'),
    handleExceptions: true, // log uncaught exceptions
    humanReadableUnhandledException: true,
  }));
}

if (config.has('logger.access.file')) {
  accessTransports.push(new winston.transports.DailyRotateFile({
    timestamp,
    json: false,
    filename: config.get('logger.access.file.path'),
    level: config.get('logger.access.file.level'),
    datePattern: '-yyyy-MM-dd.log', // rotate daily
    prepend: false,
    maxFiles: 30, // keep files from last 30 days
    zippedArchive: true,
  }));
}

if (config.has('logger.error.file')) {
  errorTransports.push(new winston.transports.DailyRotateFile({
    name: 'file-error-log',
    filename: config.get('logger.error.file.path'),
    level: config.get('logger.error.file.level'),
    datePattern: '-yyyy-MM-dd.log', // rotate daily
    prepend: false,
    maxFiles: 30, // keep files from last 30 days
    zippedArchive: true,
    timestamp,
    json: true, // must be false if we want to enable a custom formatter
    handleExceptions: true, // log uncaught exceptions
  }));
}

if (accessTransports.length) {
  accessMiddleware = expressWinston.logger({
    transports: accessTransports,
    meta: true,
    expressFormat: true,
    statusLevels: true,
  });
}

if (errorTransports.length) {
  errorMiddleware = expressWinston.errorLogger({
    transports: errorTransports,
    meta: false,
    msg: '{{err.message}}',
    expressFormat: true,
  });

  mainLogger.remove('null-transport');

  errorTransports.forEach((transport) => {
    mainLogger.add(transport, null, true);
  });
}

exports.accessMiddleware = accessMiddleware;
exports.errorMiddleware = errorMiddleware;
exports.main = mainLogger;
