/**
 * Created by yanshaowen on 2018/3/15
 *
 */
'use strict';
const log4j2 = require('./log4j2');

Object.defineProperty(exports, 'configure', {
    enumerable: true,
    get: function get() {
        return log4j2.configure;
    }
});

Object.defineProperty(exports, 'configureXML', {
    enumerable: true,
    get: function get() {
        return log4j2.configureXML;
    }
});
Object.defineProperty(exports, 'getLogger', {
    enumerable: true,
    get: function get() {
        return log4j2.getLogger;
    }
});

const Log4j2Error = require('./utils/log4j2-error-util');

Object.defineProperty(exports, 'Log4j2Error', {
    enumerable: true,
    get: function get() {
        return Log4j2Error;
    }
});