/**
 * Created by yanshaowen on 2018/3/15
 * 日志格式超类
 */
'use strict';

function formatLogData(logData) {
    let data = logData;
    if (!Array.isArray(data)) {
        const numArgs = arguments.length;
        data = new Array(numArgs);
        for (let i = 0; i < numArgs; i++) { // eslint-disable-line no-plusplus
            data[i] = arguments[i];
        }
        console.log(data);
    }
    return '11';
}

const styles = {
    // styles
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    // grayscale
    white: [37, 39],
    grey: [90, 39],
    black: [90, 39],
    // colors
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
};

function colorizeStart(style) {
    return style ? `\x1B[${styles[style][0]}m` : '';
}

function colorizeEnd(style) {
    return style ? `\x1B[${styles[style][1]}m` : '';
}
/**
 * Taken from masylum's fork (https://github.com/masylum/log4js-node)
 */
function colorize(str, style) {
    return colorizeStart(style) + str + colorizeEnd(style);
}


class Layout{
    constructor(loggingEvent, colour) {
        this._loggingEvent = loggingEvent;
        this._colour = colour;
        this._formatStr = '[%s] [%s] %s - ';
    }

    get loggingEvent() {
        return this._loggingEvent;
    }

    set loggingEvent(value) {
        this._loggingEvent = value;
    }

    get colour() {
        return this._colour;
    }

    set colour(value) {
        this._colour = value;
    }


    get formatStr() {
        return this._formatStr;
    }

    set formatStr(value) {
        this._formatStr = value;
    }

    exec() {
        return colorize(
            formatLogData(this.formatStr
                , this.loggingEvent.startTime
                , this.loggingEvent.level
                , this.loggingEvent.categoryName
            )
            , this._colour
        );
    }
}
module.exports = Layout;