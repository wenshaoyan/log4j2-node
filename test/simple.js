const log4j2 = require('../index');
const config = {
    "appenders": {
        "console":{"type":"console",layout: {type: 'detail'}},
        "kafka": {"type": "kafka", socket_config: {"kafkaHost": process.env.KAFKA_HOST, "topic": "global-log"}}
    },
    "categories": {
        "default": {"appenders": ["console", "kafka"], "level": "info"},
    }
};

log4j2.configure(config);
const Log4j2Error = require('../utils/log4j2-error-util');

const logger = log4j2.getLogger('default');
logger.info('111','22' ,{a:1}, new Log4j2Error('11', 2));
logger.error('111','22' ,{a:1}, new Log4j2Error('11', 2));
