/**
 * Created by yanshaowen on 2018/3/15
 * 系统工具类
 */
'use strict';
const path = require('path');
const localAppenderMap = new Map();
localAppenderMap.set('console', '../appenders/console');
localAppenderMap.set('kafka', '../appenders/kafka');


const localLayoutMap = new Map();
localLayoutMap.set('basic', '../layouts/basic-layout');
localLayoutMap.set('coloured', '../layouts/coloured-layout');
localLayoutMap.set('json', '../layouts/json-layout');
localLayoutMap.set('detail', '../layouts/detail-layout');

class SysUtil {
    static loadAppender(name) {
        if (localAppenderMap.has(name)) {
            return require(localAppenderMap.get(name));
        }
        return false;
    }

    static loadLayout(name) {
        if (localLayoutMap.has(name)) {
            return require(localLayoutMap.get(name));
        }
        return false;
    }

    /**
     * 从堆栈提取错误文件的列表
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

     * 总结：综合以上的输出结果
     * 简称：
     *  c:自定义类,o:Object 包含c,f:方法包含了t和s, t:构造方法,s:静态方法,p:工厂模式的方法
     *  n:没有,h:有,a:匿名
     *  n:正常模式 s: 工厂模式,p:原型模式,o:其他
     *
     * 对stack进行下面的分类
     * 1 n.no.nf: 如第一种  ''
     * 2 n.ho.af: 如第二种  Object.<anonymous>
     * 3 n.no.hf: 如第三种  func
     * 4 n.ho.hf: 如第四种  Object.func2
     * 5 n.hc.ht: 如第五种  new A
     * 6 n.nc.hs: 如第五种  Function.func4
     * 7 n.hc.hs: 如第五、六种  A.func5 or Person.func7 [as func6]
     * 8 s.ho.hp: 如第七种 Object.child.func9
     * 9 p.hc.hp: 如第八种 Function.Pop.func21
     *
     * 获取标准的堆栈信息  执行时间大致为(4-7)ms
     * @param stack         new Error().stack
     * @param type          获取指定的堆栈类型 值对应下面的类型 其他值为获取所有所有类型
     * @return              返回的为数组 每个对象包括当前执行的所有堆栈信息
     * @return.className    类名
     * @return.methodName   方法名
     * @return.file         执行的文件路径
     * @return.line         执行的所属文件行数
     * @return.row          执行的所属文件的列数
     * @return.type         堆栈类型 error:解析错误的信息 通常不会有,local:所属文件的为本地文件 system:所属文件的为系统文件
     * @return.source       堆栈源信息
     *
     *
     *
     */
    static parseStack(stack, type) {
        const list = [];
        if (typeof stack !== 'string') {
            return [];
        }
        const typeSet = new Set(['error', 'local', 'system']);
        const isFilterType = typeSet.has(type);
        const trimSurplusRe = /\s+at\s{1,4}/;
        const asFuncRe = /\s\[as\s.*\]/;
        const lineRowRe = /(.*)(:\d+:\d+$)/;
        const stackList = stack.split('\n');
        for (let i = 0; i < stackList.length; i++) {
            let current = stackList[i];
            if (!trimSurplusRe.test(current)) {
                continue;
            }
            const stack = {
                className: '-',
                methodName: '-',
                mode: 'o',
                file: '',
                line: '',
                row: '',
                type: 'error',
                source: current
            };
            current = current.replace(trimSurplusRe, '');
            let fileLineRow;
            if (current[current.length - 1] !== ')') {
                stack.mode = 'n.no.nf';
                fileLineRow = current;
            } else {
                const split = current.split(' (');
                if (split.length !== 2) {
                    continue;
                }
                const o = split[0];
                fileLineRow = split[1].substring(0, split[1].length - 1);

                const a = o.split('.');
                if (a.length === 1) {
                    if (/^new\s/.test(a[0])) {
                        stack.mode = 'n.hc.ht';
                        stack.className = a[0].substring(4, a[0].length);
                        stack.methodName = 'constructor';
                    } else {
                        stack.mode = 'n.no.hf';
                        stack.methodName = a[0];
                    }
                } else if (a.length === 2) {
                    if (o === 'Object.<anonymous>') {
                        stack.mode = 'n.ho.hf';
                        stack.className = 'Object';
                    } else if (a[0] === 'Object') {
                        stack.mode = 'n.ho.hf';
                        stack.className = 'Object';
                        stack.methodName = a[1];
                    } else if (a[0] === 'Function') {
                        stack.mode = 'n.nc.hs';
                        stack.className = 'Function';
                        stack.methodName = a[1];
                    } else {
                        stack.mode = 'n.hc.hs';
                        stack.className = a[0];
                        stack.methodName = a[1].replace(asFuncRe, '');
                    }

                } else if (a.length === 3) {
                    stack.mode = a[0] === 'Object' ? 's.ho.hp' : 'p.hc.hp';
                    stack.className = a[1];
                    stack.methodName = a[2].replace(asFuncRe, '');
                } else {
                    stack.mode = 'o';
                }
            }
            const match = fileLineRow.match(lineRowRe);
            if (match && match.length === 3) {
                stack.file = match[1];
                const split = match[2].split(':');
                stack.line = split[1];
                stack.row = split[2];
                stack.type = path.isAbsolute(stack.file) ? 'local' : 'system';
            }
            if (!isFilterType || stack.type === type) {
                list.push(stack);
            }
        }

        return list;
    }
}
module.exports = SysUtil;
