const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16}); // 메모리 관리에 효율적

const data = [];

readStream.on('data', (chunk) => { // 파일을 조각내어 읽어들인다.

    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error: ', err);
})

const writeStream = fs.createWriteStream('./writeme2.txt');

writeStream.on('finish', () => {
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다. \n');
writeStream.write('이 글을 씁니다.22 \n');
writeStream.write('이 글을 씁니다.33 \n');
writeStream.end();