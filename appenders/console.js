/**
 * Created by yanshaowen on 2018/3/15
 * 日志输出到控制台
 */
'use strict';
const Appender = require('appenders');
class Console extends Appender {
    constructor(config, layouts){
        super(config, layouts);
    }


}
module.exports = Console;
