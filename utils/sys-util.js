/**
 * Created by yanshaowen on 2018/3/15
 * 系统工具类
 */
'use strict';
const localAppenderMap  = new Map();

localAppenderMap.set('console', '../appenders');
localAppenderMap.set('kafka', '../kafka');
class SysUtil{
    static loadAppender(name) {
        if (localAppenderMap.has(name)) {
            return require(localAppenderMap.get(name));
        }
        return false;
    }
}
module.exports = SysUtil;
