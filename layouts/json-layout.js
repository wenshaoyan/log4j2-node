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
        return {t: Layout.formatDate(l.startTime), p: l.level, g: l.categoryName , a: l.content, m: Layout.formatData(l.data)};
    }
}

module.exports = JsonLayout;