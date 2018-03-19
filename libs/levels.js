/**
 * Created by yanshaowen on 2018/3/15
 * 日志级别
 */
'use strict';


class Level{
    constructor(level, levelStr, colour) {
        this.level = level;
        this.levelStr = levelStr;
        this.colour = colour;
        this.name = 'Level';
    }

    toString() {
        return this.levelStr;
    }


}
const defaultLevels = {
    ALL: new Level(Number.MIN_VALUE, 'ALL', 'grey'),
    TRACE: new Level(5000, 'TRACE', 'blue'),
    DEBUG: new Level(10000, 'DEBUG', 'cyan'),
    INFO: new Level(20000, 'INFO', 'green'),
    WARN: new Level(30000, 'WARN', 'yellow'),
    ERROR: new Level(40000, 'ERROR', 'red'),
    FATAL: new Level(50000, 'FATAL', 'magenta'),
    MARK: new Level(9007199254740992, 'MARK', 'grey'), // 2^53
    OFF: new Level(Number.MAX_VALUE, 'OFF', 'grey')
};
class Levels {

    static addLevels(customLevels) {
        const levels = Object.keys(customLevels);
        levels.forEach((l) => {
            defaultLevels[l.toUpperCase()] = new Level(customLevels[l].value, l.toUpperCase(), customLevels[l].colour);
        });
    }
    static getLevel(sArg, defaultLevel) {
        if (!sArg) {
            return defaultLevel;
        }
        if (typeof sArg === 'string') {
            return defaultLevels[sArg.toUpperCase()] || defaultLevel;
        } else {
            return defaultLevel;
        }

    }
    static levels() {
        return Object.keys(defaultLevels).sort((a, b) => b.level - a.level);
    }
    /**
     * 判断是否需要打印
     * @param configLevel       配置的level对象
     * @param practicalLevel    实际的level对象
     */
    static isConsole(configLevel, practicalLevel) {
        if('level' in configLevel && 'level' in practicalLevel) {
            return configLevel.level <= practicalLevel.level;
        }
        return true;
    }
}
module.exports = Levels;