/**
 * Created by yanshaowen on 2018/4/15.
 * 带颜色的详细格式
 */
'use strict';
const Layout = require('./layout');

class ColouredLayout extends Layout {
    constructor() {
        super();
        this.name = 'DetailLayout';
    }

    exec() {
        const l = this.loggingEvent;
        this.colour = l.level.colour;
        // l.startTime, l.level, l.categoryName, l.className, l.methodName, l.mode, l.line, l.row, l.data
        return this.formatExtendLogData(l);
    }
}

module.exports = ColouredLayout;