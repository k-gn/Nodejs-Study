const util = require('util');
const crypto = require('crypto');

// 쓰면 안될 코드에 대한 경고를 띄워주기 (util.deprecate)
const dontUseMe = util.deprecate((x,y) => {
    console.log(x + y);
}, 'dontUseMe 함수는 더 이상 사용하지 마세요!');

dontUseMe(1, 3);

// 콜백함수를 Promise로 사용할 수 있게 해준다. 단, 콜백이 (error, data) 형식이어야 한다. (util.promisify)
const randomBytesPromise = util.promisify(crypto.randomBytes);

randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString('base64'));
    })
    .catch((err) => {
        console.log(err);
    });