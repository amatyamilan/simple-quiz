const morgan = require('morgan');

// Create a stream object to log to STDOUT or STDERR depending on the status code
const stream = process.stderr; // Change to process.stdout to log to STDOUT
const logger = morgan('combined', { stream });

module.exports = logger;
