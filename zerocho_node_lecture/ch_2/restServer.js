const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile('./restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // header : html 데이터의 대한 데이터
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => { // Stream -> chunk 모으기
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name; // 사용자 등록
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('ok');
        });
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key]; // 삭제
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');
      }
    }
    res.writeHead(404); // 요청 정보를 못찾음
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err); // 서버 에러
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다');
  });

  /*
  Accept 헤더
    클라이언트가 허용할 수 있는 파일 형식(MIME TYPE)
    Accept 헤더의 경우에는 브라우저(클라이언트) 에서 웹서버로 요청시 요청메시지에 담기는 헤더이다. 
    이 Accept헤더는 쉽게 말해 자신에게 이러한 데이터 타입만 허용하겠다는 뜻입니다. 
    즉 브라우저가 요청 메시지의 Accept 헤더 값을 application/json이라고 설정했다면 클라이언트는 웹서버에게 json 데이터만 처리할 수 있으니 
    json 데이터 형식으로 응답을 돌려줘 라고 말하는것과 같다. 

  Content-Type 헤더
    Content-Type은 말그대로 HTTP 메시지(요청과 응답 모두)에 담겨 보내는 데이터의 형식을 알려주는 헤더
    HTTP 표준 스펙을 따르는 브라우저와 웹서버는 Content-Type 헤더를 기준으로 HTTP 메시지에 담긴 데이터를 분석과 파싱을한다.
    POST나 PUT처럼 메시지 BODY에 데이터를 보낼때 필요로 한다.  
  */