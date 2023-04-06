const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    });

// export  default logger;    

module.exports = logger;