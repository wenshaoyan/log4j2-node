/**
 * Created by yanshaowen on 2018/3/15
 * 记录器
 */
'use strict';
const LoggingEvent = require('./logging-event');
const levels = require('./levels');
const {parseStack} = require('../utils/sys-util');
const getArgs = function(args) {
    return Array.from(args);
};

class Logger{
    constructor(dispatch, category){
        this._context = {};
        this._category = category;
        this._dispatch = dispatch;
    }

    get dispatch() {
        return this._dispatch;
    }

    set dispatch(value) {
        this._dispatch = value;
    }

    get context() {
        return this._context;
    }

    set context(value) {
        this._context = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    addContext(key, value) {
        this.context[key] = value;
    }

    removeContext(key) {
        delete this.context[key];
    }

    clearContext() {
        this.context = {};
    }
    _log(level, data) {
        const loggingEvent = new LoggingEvent(this.category,levels.getLevel(level), data, this.context);
        const stackList = parseStack(new Error().stack);
        if (stackList[2]){
            const stack = stackList[2];
            loggingEvent.className = stack.className;
            loggingEvent.methodName = stack.methodName;
            loggingEvent.mode = stack.mode;
            loggingEvent.line = stack.line;
            loggingEvent.row = stack.row;
        }

        this.dispatch(loggingEvent);
    }

    trace() {
        this._log('trace', getArgs(arguments));
    }
    debug() {
        this._log('debug', getArgs(arguments));
    }
    info() {
        this._log('info', getArgs(arguments));
    }
    warn() {
        this._log('warn', getArgs(arguments));
    }
    error() {
        this._log('error', getArgs(arguments));
    }
    fatal() {
        this._log('fatal', getArgs(arguments));

    }

}
module.exports = Logger;