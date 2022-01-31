const crypto = require('crypto');

// 해쉬 암호화 (복호화가 안됨), 비대칭 -> sha
console.log(crypto.createHash('sha512').update('비밀번호').digest('base64'));

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt: ', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => { // 비밀번호, salt, 반복 횟수, 출력 바이트, 알고리즘
        console.log('password: ', key.toString('base64'));
    })
});

// 양방향 암호화 - aes
const algo = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';

const cipher = crypto.createCipheriv(algo, key, iv);
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
result += cipher.final('base64');
console.log('암호화: ', result);

const decipher = crypto.createDecipheriv(algo, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('복호화: ', result2);

// 키관리 - KMS 쓰는 경우가 많음
// 비밀번호(KEY)를 관리하는 전략은 다양하다.