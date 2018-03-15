/**
 * Created by yanshaowen on 2018/3/15
 * 输出对象
 */
'use strict';

class LoggingEvent {
    constructor(categoryName, level, data, context) {
        this._categoryName = categoryName;
        this._level = level;
        this._data = data;
        this._startTime = new Date();
        this._pid = process.pid;
        this._context = context;
    }


    get categoryName() {
        return this._categoryName;
    }

    set categoryName(value) {
        this._categoryName = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get startTime() {
        return this._startTime;
    }

    set startTime(value) {
        this._startTime = value;
    }

    get pid() {
        return this._pid;
    }

    set pid(value) {
        this._pid = value;
    }

    get context() {
        return this._context;
    }

    set context(value) {
        this._context = value;
    }
}

module.exports = LoggingEvent;