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
  - [detail-layout](#detail-layout)
  - [json-layout](#json-layout)
- [categories](#categories)
- [level](#level)
- [logger](#logger)
- [stack](#stack)

  

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

### detail-layout
对比coloured-layout增加了file、source、className、methodName、mode、line、row的字段

### json-layout
json的格式，输出的格式如下：
time：时间 yyyy-mm-dd hh-MM-ss.S
level：级别 
category：类别
message：输出的消息
context：context
file: 执行输出的所属的文件
source：执行输出的堆栈原信息
className：执行输出的所属class
methodName：执行输出的所属方法
mode：执行输出mode
line：执行输出所在行数
row：执行输出所在列数

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
### stack
通过stack获取执行打印的相关js的信息。关于mode等参数的说明如下。
```text
从堆栈提取错误文件的列表
1:匿名函数内直接调用
代码：
(function () { console.log(new Error())})()
输出:
at D:\build\node\log4j2-node\test\simple.js:22:17
at Object.<anonymous> (D:\build\node\log4j2-node\test\simple.js:34:3)

2：直接调用
代码：
console.log(new Error().stack);
输出：
at Object.<anonymous> (D:\build\node\log4j2-node\test\simple.js:90:13)

3: 间接通过函数调用
代码：
function func() {
          console.log(new Error());
      }
func();
输出：
at func (D:\build\node\log4j2-node\test\simple.js:38:17)
at Object.<anonymous> (D:\build\node\log4j2-node\test\simple.js:40:1)
4：间接通过对象的静态函数调用
代码：
const o = {
          func2() {
              console.log(new Error());
          }
      };
o.func2();
输出：
at Object.func2 (D:\build\node\log4j2-node\test\simple.js:50:21)
at Object.<anonymous> (D:\build\node\log4j2-node\test\simple.js:54:3)
5：通过es6类的实例调用和类的静态函数调用
代码：
class A {
          constructor(){
              console.log(new Error());
          }
          static func4(){
              console.log(new Error());
          }
          func5(){
              console.log(new Error());
          }
       }
const a = new A();

A.func4();
a.func5();
输出：
at new A (D:\build\node\log4j2-node\test\stack.js:47:21)
at Object.<anonymous> (D:\build\node\log4j2-node\test\stack.js:57:11)

at Function.func4 (D:\build\node\log4j2-node\test\simple.js:63:21)
at Object.<anonymous> (D:\build\node\log4j2-node\test\simple.js:72:3)

at A.func5 (D:\build\node\log4j2-node\test\simple.js:66:21)
at Object.<anonymous> (D:\build\node\log4j2-node\test\simple.js:71:3)

6：通过构造函数的实例调用
代码：
function Person() {
          this.func6 = func7;
          this.func8 = func8;
      }

function func7() {
          console.log(new Error());
      }
function func8() {
          console.log(new Error());
      }
new Person('1','2').func6();
new Person('1','2').func8();
输出：
at Person.func7 [as func6] (D:\build\node\log4j2-node\test\stack.js:66:17)
at Object.<anonymous> (D:\build\node\log4j2-node\test\stack.js:71:21)

at Person.func8 (D:\build\node\log4j2-node\test\stack.js:69:17)
at Object.<anonymous> (D:\build\node\log4j2-node\test\stack.js:72:21)
7：工厂模式调用
代码：
function child() {
          const child = {};
          child.func9 = function () {
              console.log(new Error());

          };
          return child;
       }
child().func9();
输出：
at Object.child.func9 (D:\build\node\log4j2-node\test\stack.js:80:21)
at Object.<anonymous> (D:\build\node\log4j2-node\test\stack.js:85:9)
8：原型链的实例调用和静态调用
代码：
function Pop(_name,_age) {

       }
Pop.prototype.func20 = function () {
          console.log(new Error());
       };

Pop.func21 = function () {
          console.log(new Error());
       };

new Pop().func20();
Pop.func21()
输出：
at Pop.func20 (D:\build\node\log4j2-node\test\stack.js:92:17)
at Object.<anonymous> (D:\build\node\log4j2-node\test\stack.js:99:11)

at Function.Pop.func21 (D:\build\node\log4j2-node\test\stack.js:96:17)
at Object.<anonymous> (D:\build\node\log4j2-node\test\stack.js:100:5)

总结：综合以上的输出结果
简称：
c:自定义类,o:Object 包含c,f:方法包含了t和s, t:构造方法,s:静态方法,p:工厂模式的方法
n:没有,h:有,a:匿名
n:正常模式 s: 工厂模式,p:原型模式,o:其他
对stack进行下面的分类
1 n.no.nf: 如第一种  ''
2 n.ho.af: 如第二种  Object.<anonymous>
3 n.no.hf: 如第三种  func
4 n.ho.hf: 如第四种  Object.func2
5 n.hc.ht: 如第五种  new A
6 n.nc.hs: 如第五种  Function.func4
7 n.hc.hs: 如第五、六种  A.func5 or Person.func7 [as func6]
8 s.ho.hp: 如第七种 Object.child.func9
9 p.hc.hp: 如第八种 Function.Pop.func21

```


### 项目地址
https://github.com/wenshaoyan/log4j2-node


   
   
