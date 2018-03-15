/**
 * Created by yanshaowen on 2018/3/15
 *
 */
'use strict';

class Log4j2{
    /**
     * 加载配置 json格式
     */
    static configure() {

    }
    static configureXML() {

    }

    /**
     *
     * @param categorie
     * @return {Console}
     */
    static getLogger(categorie) {
        return console;
    }
}


module.exports = Log4j2