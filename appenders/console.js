/**
 * Created by yanshaowen on 2018/3/15
 * 日志输出到控制台
 */
'use strict';
const Appender = require('./appender');
const {loadLayout} = require('../utils/sys-util');
const Log4j2Error = require('../utils/log4j2-error-util');
const consoleLog = console.log.bind(console);

class Console extends Appender {
    constructor(config) {
        super();
        let Layout = loadLayout('coloured');
        if (config.layout) {
            Layout = loadLayout(config.layout.type);
            if (!Layout) {
                throw new Log4j2Error(`${config.layout.type} not in layouts`);
            }
        }
        this.layout = new Layout();
        this.callback = consoleLog;
    }
}
module.exports = Console;
