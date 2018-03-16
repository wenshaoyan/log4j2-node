/**
 * Created by yanshaowen on 2018/3/15
 * 带颜色的通用格式
 */
const Layout = require('./layout');

class ColouredLayout extends Layout {
    constructor(){
        super();
        this.name = 'BasicLayout';
    }
    exec() {
        const l = this.loggingEvent;
        this.colour = l.level.colour;
        return this.formatLogData(l.startTime, l.level, l.categoryName, l.data);
    }
}

module.exports = ColouredLayout;