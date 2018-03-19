# log4j2-node
## 目录说明
- appenders:存所有appenders
   - console: 输出到控制台
   - kafka: 输出到kafka
   
- libs: 核心包
   - layouts: 输出格式
   - level: 级别
   - configuration: 配置
   - logger: 记录器
   - logging-event: 输出的对象
- utils: 工具包
   - verify: 参数验证
- test: 测试包
   - simple 测试文件
   
## 安装
```text
npm install log4j2-node
```

## 简单实例
```js

const log4j2 = require('log4j2-node');
const config = {
    "appenders": {
        "console":{"type":"console"},
        "kafka": {"type": "kafka", "kafkaHost":  process.env.KAFKA_HOST, "topic": "global-log"}
    },
    "categories": {
        "default": {"appenders": ["console", "kafka"], "level": "info"},
    }
};

log4j2.configure(config);
const Log4j2Error = require('../utils/log4j2-error-util');

const logger = log4j2.getLogger('default');
logger.info('111','22' ,{a:1}, new Log4j2Error('11', 2));
logger.error('111','22' ,{a:1}, new Log4j2Error('11', 2));


```

   
   