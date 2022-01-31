// 노드에서의 멀티스레드 방식
// 노드는 멀티스레드 방식을 잘 안쓰고 어려움

// isMainThread : 현재 코드가 메인 스레드에서 실행되는지 워커 스레드에서 실행되는지 구분
// new Worker 를 통해 현재 파일을 워커 스레드에서 실행시킨다.
// worker.postMessage 로 부모에서 워커로 메시지를 보낸다.
// parentPort.on('message') 로 부모로부터 데이터를 받고, postMessage로 데이터를 보낸다.

const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

if(isMainThread) { // main
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: {start: 1} // 초기 데이터
    }));
    threads.add(new Worker(__filename, {
        workerData: {start: 2} // 초기 데이터
    }));

    for(let worker of threads) {
        worker.on('error', (err) => {
            throw err;
        });
        worker.postMessage('ping');
        worker.on('message', (value) => {
            console.log(value);
        });
        worker.on('exit', () => {
            threads.delete(worker);
            console.log('end');
        });
    }

    // const worker = new Worker(__filename);
    
}else { // worker
    const data = workerData;

    parentPort.postMessage(data.start + 100);

    // parentPort.on('message', (value) => {
    //     console.log(value);
    //     parentPort.postMessage('pong');
    //     parentPort.close();
    // })

}
