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

}
module.exports = Log4j2Error;