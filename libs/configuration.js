/**
 * Created by yanshaowen on 2018/3/15
 * 配置
 */
'use strict';
const SysUtil = require('../utils/sys-util');
const Log4j2Error = require('../utils/log4j2-error-util');
const Level = require('../libs/levels');

const def = {
    "appenders": {
        "console":{"type":"console"}
    },
    "categories": {
        "default": {"appenders": ["console"], "level": "trace"}
    }
};
class Configuration {
    constructor(config) {
        this.config = config;
        if (this.config === undefined) {
            console.warn('warning: config is undefined, pls log4j2.configure({...})');
            this.config = def;
        }
        Log4j2Error.isJson(this.config, '');

        this.configuredAppenders = new Map();
        this.configuredCategories = new Map();
        this.configuredLevels = null;
        this.levels = this.config.levels;
        this.appenders = this.config.appenders;
        this.categories = this.config.categories;
    }

    get appenders() {
        return this.configuredAppenders;
    }

    set appenders(value) {
        if (typeof value !== 'object') {
            throw new Log4j2Error(`appenders must is object`);
        }
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
        return this.configuredCategories;
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
                {appenders: appenders, level: this.configuredLevels.getLevel(category.level)}
            );
        });

        this._categories = value;
    }

    get levels() {
        return this.configuredLevels;
    }

    set levels(value) {
        if (value) {
            Level.addLevels(value);
        }
        this.configuredLevels = Level;

    }


}

module.exports = Configuration;