const odd = '홀수';
const even = '짝수';

// 한가지만 exports 할 경우 module.exports
// 여러개를 할 경우 exports.obj = obj; or module.exports = { odd, even }; (이 두개를 같이 쓸 순 없다.)

// 아래에 module.exports 를 또 쓸 경우 아래 두개는 무시된다.
exports.odd = odd;
exports.even = even;
// module.exports = { odd, even };
// export default { odd, even };

// module.exports = [odd, even];