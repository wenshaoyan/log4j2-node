/**
 * Created by yanshaowen on 2018/3/15
 * 系统工具类
 */
'use strict';
const localAppenderMap  = new Map();
localAppenderMap.set('console', '../appenders/console');
localAppenderMap.set('kafka', '../appenders/kafka');


const localLayoutMap  = new Map();
localLayoutMap.set('basic', '../layouts/basic-layout');
localLayoutMap.set('coloured', '../layouts/coloured-layout');

class SysUtil{
    static loadAppender(name) {
        if (localAppenderMap.has(name)) {
            return require(localAppenderMap.get(name));
        }
        return false;
    }
    static loadLayout(name) {
        if (localLayoutMap.has(name)) {
            return require(localLayoutMap.get(name));
        }
        return false;
    }
}
module.exports = SysUtil;
