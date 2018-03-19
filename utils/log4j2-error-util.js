/**
 * Created by yanshaowen on 2018/3/15
 * 异常类
 */
'use strict';
class Log4j2Error extends Error{
    constructor(message, code){
        super(message);
        this.code = code;
        this.name = 'Log4j2Error';
    }
    // 必须为json对象
    static isJson(o, message) {
        if (typeof o === 'object' && !Array.isArray(o)) {
            return true;
        }
        throw new Log4j2Error(message, 1);
    }
    // 必须为object
    static isObject(o, message) {
        if (typeof o === 'object') {
            return true;
        }
        throw new Log4j2Error(message, 2);
    }
    // 必须为array
    static isArray(o, message) {
        if (Array.isArray(o)) {
            return true;
        }
        throw new Log4j2Error(message,3);
    }
}
module.exports = Log4j2Error;