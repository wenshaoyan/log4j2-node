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
const Log4j2Error = require('../utils/log4j2-error-util');

const logger = log4j2.getLogger('default');
logger.info('111','22' ,{a:1}, new Log4j2Error('11', 2));
logger.error('111','22' ,{a:1}, new Log4j2Error('11', 2));
