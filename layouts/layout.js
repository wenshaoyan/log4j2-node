/**
 * Created by yanshaowen on 2018/3/15
 * 日志格式超类
 */
'use strict';

function formatLogDataColor(_format, _date, _level, _categoryName, _data) {
    return `[${_date}] [${_level}] ${_categoryName} -`;
}
function formatData(_data) {
    let input = '';
    _data.forEach(v => {
        if (v instanceof Error) {
            const values = [];
            Object.keys(v).map(k => {
                if (k !== 'name') {
                    if (typeof v[k] === 'object') {
                        values.push(`${k}:${JSON.stringify(v[k])}`);
                    } else {
                        values.push(`${k}:${v[k]}`);
                    }
                }
            });
            v = `{ ${v.stack} \n    ${values.toString()} } `;
        } else if (typeof v === 'object') {
            v = JSON.stringify(v);
        }
        input += ' ' + v;
    });
    return input;

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

function formatDate(d, fmt) {
    if (!fmt) {
        fmt = 'yyyy-MM-dd hh:mm:ss.S';
    }
    const o = {
        "M+": d.getMonth() + 1, //月份
        "d+": d.getDate(), //日
        "h+": d.getHours(), //小时
        "m+": d.getMinutes(), //分
        "s+": d.getSeconds(), //秒
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度
        "S": d.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

class Layout {
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

    formatLogData(_date, _level, _categoryName, _data) {
        return colorize(formatLogDataColor(this.formatStr, formatDate(_date), _level, _categoryName), this.colour) + formatData(_data);
    }

    /**
     * 格式化时间
     * @param date
     * @return
     */
    static formatDate(date) {
        return formatDate(date);
    }
    static formatData(data) {
        return formatData(data);
    }

    exec() {
        const l = this.loggingEvent;
        return this.formatLogData(l.startTime, l.level, l.categoryName, l.data);

    }
}

module.exports = Layout;