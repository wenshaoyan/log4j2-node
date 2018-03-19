# log4j2-node

## 简介
  因为log4js模块引用的第三方包比较多，所以写了个精简版本，不需要引入第三方模块。配置文件的格式和log4js的基础配置保持一致(自定义appends和layout会有不同)。
目前支持的appenders有console、kafka， layout有basic、coloured、json，并且目前不支持自定义，后期会加上。
  

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
   - log4j2-error-util: 错误类
   - sys-util: 系统工具类
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
        "kafka": {"type": "kafka", socket_config: {"kafkaHost":  process.env.KAFKA_HOST, "topic": "global-log"}}
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

## 文档
- [appenders](#appenders)
  - [console-appender](#console-appender)
  - [kafka-appender](#kafka-appender)
- [layouts](#layouts)
  - [basic-layout](#basic-layout)
  - [coloured-layout](#coloured-layout)
  - [json-layout](#json-layout)
- [categories](#categories)
- [level](#level)
- [logger](#logger)
  

### appenders
appender将日志事件序列化为某种形式的输出。他们可以写文件，发送电子邮件，通过网络发送数据。
所有的appender都有一个类型来决定使用哪个appender。所有的appender都继承Appender基础类。

### console-appender
输出日志到控制台。配置的参数：<br>
type: console。<br>
layout: 默认的type为coloured。<br>
#### 实例
```js
log4j2.configure({
    appenders: {type: 'console', layout: {type: 'coloured'}}
});
```

### kafka-appender
输出到kafka服务。配置的参数：<br>
type: kafka。<br>
layout: 默认的type为json。<br>
socket_config: 连接远程服务器的配置。
socket_config.kafkaHost：kafka服务的地址，多个地址用","分隔。<br>
socket_config.topic：生产者的topic，目前只支持一个appender配置一个topic。<br>

#### 实例
```js
log4j2.configure({
    "kafka": {"type": "kafka",layout: {type: 'json'}, socket_config: {"kafkaHost": process.env.KAFKA_HOST, "topic": "global-log"}}
});
```

### layouts
布局是appender用来为输出格式化日志事件的函数。他们以一个日志事件作为参数，并返回一个字符串。

### basic-layout
基础的layout。输出的格式带有时间、等级、分类。


### coloured-layout
对比basic-layout增加了不同的级别输入的带颜色。


### json-layout
json的格式，输出的格式如下：
t：时间 yyyy-mm-dd hh-MM-ss.S
p：级别 
g：类别
m：输出的消息
a：context


### categories
类别。<br>
appenders: 必填，数组，输出的appender
level：可填，string，匹配到该categorie的最小级别 

### level
级别，内置的级别，从小到大为:ALL、TRACE、DEBUG、INFO、WARN、ERROR、FATAL、MARK、OFF。<br>

### logger
记录器，对应categories json的key。logger实例方法对应到level的名称
```js
const config = {
    "appenders": {
        "console":{"type":"console",layout: {type: 'json'}},
        "kafka": {"type": "kafka", socket_config: {"kafkaHost": process.env.KAFKA_HOST, "topic": "global-log"}}
    },
    "categories": {
        "default": {"appenders": ["console", "kafka"], "level": "info"},
    }
};

log4j2.configure(config);
const logger = log4j2.getLogger('default');
logger.info('1');
```




   
   