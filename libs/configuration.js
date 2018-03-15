/**
 * Created by yanshaowen on 2018/3/15
 * 配置
 */
'use strict';
const SysUtil = require('../utils/sys-util');
class Configuration {

    constructor(config) {
        this.config = config;
        this.appenders = config.appenders;
        this.categories = config.categories;
        this.configuredAppenders = new Map();
    }

    get appenders() {
        return this.configuredAppenders;
    }
    set appenders(value) {
        const keys = Object.keys(value);
        keys.forEach(k => {
            this.configuredAppenders.set(k, SysUtil.loadAppender(value[k]))
        });
        //this._appenders = value;
    }

    get categories() {
        return this._categories;
    }

    set categories(value) {
        this._categories = value;
    }



}

module.exports = Configuration;