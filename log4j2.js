/**
 * Created by yanshaowen on 2018/3/15
 *
 */
'use strict';
const Configuration = require('./libs/configuration');
const Logger = require('./libs/logger');
const Levels = require('./libs/levels');

// Configuration对象
let config;

const sendLogEventToAppender = (logEvent) => {
    let categoryName = logEvent.categoryName;
    if (!config.categories.has(categoryName)) {
        categoryName = 'default';
    }
    const catObject = config.categories.get(categoryName);
    catObject.appenders.forEach((appender) => {
        if (Levels.isConsole(catObject.level, logEvent.level)) appender.exec(logEvent);
    });
};
class Log4j2 {
    /**
     * 加载配置 json格式
     */
    static configure(_config) {
        config = new Configuration(_config);
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