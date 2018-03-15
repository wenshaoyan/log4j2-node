/**
 * Created by yanshaowen on 2018/3/15
 * 配置
 */
'use strict';
const SysUtil = require('../utils/sys-util');
const Log4j2Error = require('../utils/log4j2-error-util');
class Configuration {

    constructor(config) {
        this.config = config;
        this.configuredAppenders = new Map();
        this.configuredCategories = new Map();
        this.appenders = config.appenders;
        this.categories = config.categories;
    }

    get appenders() {
        return this.configuredAppenders;
    }
    set appenders(value) {
        const keys = Object.keys(value);
        keys.forEach(k => {
            const Appender = SysUtil.loadAppender(value[k].type);
            if (!Appender) {
                throw new Log4j2Error(`not found ${value[k].type} in appenders`);
            }
            const appender = new Appender(value[k]);
            this.configuredAppenders.set(k, appender);
        });
    }

    get categories() {
        return this._categories;
    }

    set categories(value) {
        const keys = Object.keys(value);
        keys.forEach(k => {
            const category = value[k];
            const appenders = [];
            category.appenders.forEach((appender) => {
                appenders.push(this.appenders.get(appender));
            });

            this.configuredCategories.set(
                k,
                { appenders: appenders, level: this.configuredLevels.getLevel(category.level) }
            );
        });

        this._categories = value;
    }



}

module.exports = Configuration;