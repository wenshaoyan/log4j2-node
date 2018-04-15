/**
 * Created by yanshaowen on 2018/3/17.
 * json 格式
 */
'use strict';
const Layout = require('./layout');

class JsonLayout extends Layout {
    constructor(){
        super();
        this.name = 'BasicLayout';
    }
    exec() {
        const l = this.loggingEvent;
        return JSON.stringify({
            time: Layout.formatDate(l.startTime),
            level: l.level.levelStr,
            category: l.categoryName ,
            context: l.context,
            message: Layout.formatData(l.data),
            className: l.className,
            methodName: l.methodName,
            mode: l.mode,
            line: l.line,
            row: l.row,
            file: l.file,
            source: l.file
        });
    }
}

module.exports = JsonLayout;