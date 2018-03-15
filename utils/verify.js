/**
 * Created by yanshaowen on 2018/3/15
 * 验证参数
 */
'use strict';

class Verify{
    static verify(config, data) {
        if(typeof data === 'object' && !Array.isArray(data) && typeof config === 'object' && !Array.isArray(config)){
            let arr = [];
            for(let key in config){
                if(key in data && typeof data[key] ===`${config[key].type}` && JSON.stringify(data[key])!== '{}'){
                    arr.push(true)
                }else {
                    arr.push(false)
                }
            }
            if(arr.toString() === 'true,true'){
                return true;
            }else{
                return false;
            }
        }else{
            throw new Error('verify failure');
        }
    }


}
module.exports = Verify;