const fs = require('fs');
const zlib = require('zlib'); // 압축

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
// const writeStream = fs.createWriteStream('./writeme3.txt');
const zlibStream = zlib.createGzip(); // 압축 스트림
const writeStream = fs.createWriteStream('./writeme4.txt.gz');

readStream.pipe(zlibStream).pipe(writeStream); // 파이프로 연결, 여러번 연결 가능