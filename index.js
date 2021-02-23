const chalk = require('chalk');

let logger = console.log;

const colors = [
  20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74,
  75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149,
  160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184,
  185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215,
  220, 221
];

function formatColor (namespace) {
  let hash = 0;

  for (let i = 0; i < namespace.length; i++) {
    hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0;
  }

  const color = colors[Math.abs(hash) % colors.length];
  const prefix = '\u001B[3' + (color < 8 ? color : '8;5;' + color);

  return `${prefix};1m${namespace} \u001B[0m`;
}

function padStartAll (minLength, text) {
  return text.split('\n').map(line => ''.padStart(minLength) + line).join('\n');
}

let lastNamespace = '';

function createLogger (namespace, type, formatter) {
  return function (message, details) {
    const date = (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString();

    if (process.env.LOGSLOT_FORMAT === 'pretty') {
      if (lastNamespace !== namespace) {
        logger(chalk.gray(date), formatColor(namespace.padEnd(20)));
        lastNamespace = namespace;
      }

      logger(chalk.gray(date), ' ', formatter(type.padEnd(7).toUpperCase()), message);
      if (details) {
        const detailsFormatted = Object.keys(details).length < 2
          ? JSON.stringify(details)
          : JSON.stringify(details, null, 2);

        logger(
          chalk.greenBright(padStartAll(date.length + 13, detailsFormatted))
        );
      }
      return;
    }
    details
      ? logger(JSON.stringify([date, namespace, type.toUpperCase(), message, details]))
      : logger(JSON.stringify([date, namespace, type.toUpperCase(), message]));
  };
}

function log (namespace) {
  return {
    error: createLogger(namespace, 'error', chalk.red),
    warn: createLogger(namespace, 'warn', chalk.yellow),
    info: createLogger(namespace, 'info', chalk.cyan),
    verbose: createLogger(namespace, 'verbose', chalk.gray),
    debug: createLogger(namespace, 'debug', chalk.gray)
  };
}

log.setLogger = newLogger => {
  logger = newLogger;
};

module.exports = log;
