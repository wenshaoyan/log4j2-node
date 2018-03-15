/**
 * Created by yanshaowen on 2018/3/15
 *
 */
'use strict';
const Verify = require('./utils/verify');
const Configuration = require('./libs/configuration');
const configSchema = {
    appenders: {
        type: 'object',
        required: true,
    },
    categories: {
        type: 'object',
        required: true,
    }
};
class Log4j2{
    /**
     * 加载配置 json格式
     */
    static configure(config) {
        Verify.verify(configSchema, config);
        new Configuration(config);

    }
    static configureXML() {

    }

    /**
     *
     * @param categorie
     */
    static getLogger(categorie) {
        return console;
    }
}


module.exports = Log4j2;