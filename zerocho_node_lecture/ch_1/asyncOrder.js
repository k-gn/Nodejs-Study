// 노드는 동기-블로킹 or 비동기-논블로킹 방식이 대부분
// 한번만쓰거나 서버가 실행전 동기-블로킹
// 서버 실행후엔 비동기-논블로킹
// 이게 꼭 정답은 아니다.
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if(err) {
        throw err;
    }

    console.log('1번', data.toString());
    fs.readFile('./readme.txt', (err, data) => {
        if(err) {
            throw err;
        }
    
        console.log('2번', data.toString());
        fs.readFile('./readme.txt', (err, data) => {
            if(err) {
                throw err;
            }
        
            console.log('3번', data.toString());
            fs.readFile('./readme.txt', (err, data) => {
                if(err) {
                    throw err;
                }
            
                console.log('4번', data.toString());
            });
        });
    });
});