const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v); // 한글처리
      return acc; 
    }, {}); // 문자열로 온 쿠키값을 객체로 파싱

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query); // queryString 추출
    const expires = new Date();
    // 쿠키 유효 시간을 현재시간 + 5분으로 설정 (쿠키에 만료기간을 설정하지 않으면 세션쿠키가 된다.)
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, { // 302 : redirect
      Location: '/', // 쿠키에 한글이 있으면 안되서 인코딩 처리
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, 
      // HttpOnly : js로 쿠키접근 방지 (거의 필수)
      // Path : 쿠키 유효경로 범위
      // 도메인이 같아야함
      // Domain : 특정 도메인 지정
      // Max-age : 날짜 대신 초 지정 만료기간
      // Secure : https
    });
    res.end();
  // name이라는 쿠키가 있는 경우
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile('./cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
  });