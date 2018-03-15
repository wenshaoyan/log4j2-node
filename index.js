/**
 * Created by yanshaowen on 2018/3/15
 *
 */
'use strict';
const Verify = require('./utils/verify');
const Configuration = require('./libs/configuration');
const Logger = require('./libs/logger');
const configSchema = {
    appenders: {
        type: 'object',
        required: true,
    },
    categories: {
        type: 'object',
        required: true,
    }
};
// Configuration对象
let config;

const sendLogEventToAppender = (logEvent) => {
    if (!config.categories.has(logEvent.categoryName)) {

    }

    const appenders = appendersForCategory(logEvent.categoryName);
    appenders.forEach((appender) => {
        appender(logEvent);
    });
};
class Log4j2{
    /**
     * 加载配置 json格式
     */
    static configure(config) {
        Verify.verify(configSchema, config);
        config = new Configuration(config);

    }
    static configureXML() {

    }

    /**
     *
     * @param category
     */
    static getLogger(category) {
        const cat = category || 'default';

        return new Logger(sendLogEventToAppender, cat);
    }
}


module.exports = Log4j2;