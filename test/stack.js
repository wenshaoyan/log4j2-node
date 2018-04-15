/**
 * Created by wenshao on 2018/4/14.
 */
'use strict';
const log4j2 = require('../index');
const config = {
    "appenders": {
        "console":{"type":"console",layout: {type: 'detail'}},
    },
    "categories": {
        "default": {"appenders": ["console"], "level": "info"},
    }
};

log4j2.configure(config);
const logger = log4j2.getLogger('default');

(function () {
    logger.info('test');
    function func10() {
        logger.info('test');
        console.log(new Error());
    }
    const func11 = ()=>{
        logger.info('test');

    };
    func10();
    func11();
})();


function func() {
    logger.info('test');
}
func();
const func1 = () => {
    logger.info('test');
    console.log(new Error());

};
func1();


const o = {
    func2() {
        logger.info('test');
        console.log(new Error());

    },

};
o.func2();



class A {
    constructor(){
        logger.info('test');
        console.log(new Error());

    }
    static func4(){
        logger.info('test');
        console.log(new Error());

    }
    func5(){
        logger.info('test');
        console.log(new Error());

    }
}
const a = new A();

A.func4();
a.func5();


function Person() {
    this.func6 = func7;
    this.func8 = func8;
}

function func7() {
    logger.info('test');
    console.log(new Error());

}
function func8() {
    logger.info('test');
    console.log(new Error());

}
new Person('1','2').func6();
new Person('1','2').func8();




function child() {
    const child = {

    };
    child.func9 = function () {
        logger.info('test');
        console.log(new Error());


    };
    return child;
}
child().func9();


function Pop(_name,_age) {

}
Pop.prototype.func20 = function () {
    logger.info('test');
    console.log(new Error());
};

Pop.func21 = function () {
    logger.info('test');
    console.log(new Error());
};

new Pop().func20();
Pop.func21()

logger.info('test'.stack);





