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
        this._className = undefined;
        this._methodName = undefined;
        this._mode = undefined;
        this._line = undefined;
        this._row = undefined;
        this._file = undefined;
        this._source = undefined;
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

    get className() {
        return this._className;
    }

    set className(value) {
        this._className = value;
    }

    get methodName() {
        return this._methodName;
    }

    set methodName(value) {
        this._methodName = value;
    }

    get mode() {
        return this._mode;
    }

    set mode(value) {
        this._mode = value;
    }

    get line() {
        return this._line;
    }

    set line(value) {
        this._line = value;
    }

    get row() {
        return this._row;
    }

    set row(value) {
        this._row = value;
    }

    get file() {
        return this._file;
    }

    set file(value) {
        this._file = value;
    }

    get source() {
        return this._source;
    }

    set source(value) {
        this._source = value;
    }
}

module.exports = LoggingEvent;