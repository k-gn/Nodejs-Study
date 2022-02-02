const http = require('http');

// 서버 생성
const server = http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>End</p>');

})
.listen(8080);
// .listen(8080, () => { // 8080 포트로 올리기
//     console.log("8080번 포트에서 서버 대기중입니다.");
// }); 

server.on('listening', (error) => { // 따로 listen 콜백을 빼서 작업가능
    console.log("8080번 포트에서 서버 대기중입니다.");
});

server.on('error', (error) => {
    console.log(error);
});

// 서버 코드 수정 후 항상 껏다켜야 수정이 적용된다.

// 2개 이상 돌릴 수도 있다.
const server2 = http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>End</p>');

})
.listen(8080);