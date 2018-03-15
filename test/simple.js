const log4j2 = require('../index');
const config = {
    "appenders": {
        "console":{"type":"console"}
    },
    "categories": {
        "default": {"appenders": ["console"], "level": "trace"}
    }
};

log4j2.configure(config);

const logger = log4j2.getLogger('default');
logger.info('111');
const consoleLog = console.log.bind(console);
