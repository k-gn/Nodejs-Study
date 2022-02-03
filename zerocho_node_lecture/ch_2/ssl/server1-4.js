const http2 = require('http2'); // ssl 암호화와 더불어 최신 http 프로토콜, 웹 속도 개선
const fs = require('fs');

http2.createSecureServer({
// 인수 필요, 인증기관에서 얻어온 인증서가 필요하다.
  cert: fs.readFileSync('도메인 인증서 경로'), // readFileSync : 서버 시작 전 딱한번 실행하거나, 초기화 할때 사용
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });