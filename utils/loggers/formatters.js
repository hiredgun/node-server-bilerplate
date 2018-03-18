'use strict';

exports.errorFormatter = (options) => {
  const { stack, req, process, trigger = '' } = options.meta || {};
  const meta = {
    stack,
    req,
    process,
  };

  const triggerString = trigger ? `trigger=${trigger}` : '';

  const msg = `------ ${options.timestamp()} ------> ${options.level.toUpperCase()} ${options.message} ${JSON.stringify(meta)} ${triggerString}`;

  return msg;
};
