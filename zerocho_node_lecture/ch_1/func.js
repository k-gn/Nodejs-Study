// const value = require('./var');

// const {odd, even} = require('./var');

// console.log(value);

import {odd, even} from './var';

function check(number) {

    if(number % 2) {
        return odd;
    }else {
        return even;
    }
}

const result = check(5);
console.log(result);

// 파일에서 단 한번만 사용
// module.exports = {
//     check,
//     odd,
//     even
// }

export default {check, odd, even};