// 기본적으로 싱글 스레드인 노드가 CPU 코어를 모두 사용할 수 있게 해주는 모듈
// 요청이 많을 때 병렬로 실행된 서버의 개수만큼 요청이 분산된다. => 서버에 무리가 덜간다.
// 코어가 8개인 서버가 있을 때 코어 하나당 노드 프로세스 하나를 배정 가능
// 단, 성능이 8배가 되는건 아니지만 개선은 된다.
// 서로 자원 공유는 못함
// 해당 문제는 Redis 등 별도 서버로 해결 가능
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// 마스터 프로세스 : cpu 개수만큼 워커 프로세스를 만든다. (worker_thread랑 비슷)
// 요청이 들어오면 워커 프로세스에 고르게 분배
if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork(); // 코어 갯수만큼 여러 서버를 마련
  }
  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork(); // 서버가 어떠한 에러가 생겨도 꺼지지 않도록 종료 시 다시 새 워커를 생성해 살림
  });
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
    setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
      process.exit(1);
    }, 1000);
  }).listen(8086); // 하나의 포트로 여러 워커(서버) 생성

  console.log(`${process.pid}번 워커 실행`);
}