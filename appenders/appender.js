/**
 * Created by yanshaowen on 2018/3/15
 * appender的超类
 */
'use strict';
class Appender{
    constructor(layout, callback) {
        this._layout = layout;
        this._callback = callback;
    }

    get layout() {
        return this._layout;
    }

    set layout(value) {
        this._layout = value;
    }


    get callback() {
        return this._callback;
    }

    set callback(value) {
        this._callback = value;
    }

    exec(loggingEvent) {
        this._callback(this._layout(loggingEvent));
    }


}
module.exports = Appender;
