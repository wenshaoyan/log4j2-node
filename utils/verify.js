/**
 * Created by yanshaowen on 2018/3/15
 * 验证参数
 */
'use strict';

class Verify{
    static verify(schema, data) {
        if (typeof schema === 'object' && typeof data === 'object') {
            return true;
        }
        throw new Error('verify failure');
    }


}
module.exports = Verify;