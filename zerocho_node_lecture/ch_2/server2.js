const http = require('http');
const fs = require('fs').promises;

// 서버 생성
const server = http.createServer((req, res) => {

    try {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        const data = await fs.readFile('./server.html');
        res.end(data);
    }catch(error) {
        console.log(error);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(error.message);
    }
    
})
.listen(8080);

server.on('listening', (error) => {
    console.log("8080번 포트에서 서버 대기중입니다.");
});

server.on('error', (error) => {
    console.log(error);
});
