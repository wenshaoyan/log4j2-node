/**
 * Created by yanshaowen on 2018/3/15
 * 日志输出到kafka
 */
'use strict';
const Appender = require('./appender');
const {loadLayout} = require('../utils/sys-util');
const Log4j2Error = require('../utils/log4j2-error-util');
class Kafka extends Appender {
    constructor(config, layouts) {
        super(config, layouts);
        let Layout = loadLayout('json');
        if (config.layout) {
            Layout = loadLayout(config.layout.type);
            if (!Layout) {
                throw new Log4j2Error(`${config.layout.type} not in layouts`);
            }
        }
        this.layout = new Layout();
        const kafka = require('kafka-node'),
            Producer = kafka.Producer,
            client = new kafka.KafkaClient({kafkaHost:config.kafkaHost}),
            producer = new Producer(client);
        this.callback = function (d) {
            producer.send([{ topic: config.topic, messages: JSON.stringify(d), key:'test' }], (err,data) => {

            })
        };
    }
    exec(loggingEvent) {
        this.layout.loggingEvent = loggingEvent;
        this.callback(this.layout.exec(loggingEvent));
    }


}

module.exports = Kafka;
