const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', () => {
    console.log("이벤트1");
});

myEvent.on('event2', () => {
    console.log("이벤트2");
});

myEvent.on('event2', () => {
    console.log("이벤트2 추가");
});

myEvent.once('event3', () => {
    console.log('한번만 이벤트 실행');
});

myEvent.emit('event1'); // 이벤트 호출

myEvent.on('event4', () => {
    console.log("이벤트4");
});

myEvent.removeAllListeners('event4'); // 이벤트 삭제

const listener = () => {
    console.log('이벤트 5');
};

myEvent.on('event5', listener);
myEvent.removeListener('event5', listener); // 특정 이벤트 하나만 삭제

console.log(myEvent.listenerCount('event2'));

// promise 에는 try catch 붙이는 습관을 들이자.

// 모든 에러를 처리
// 에러 내용 기록용으로만 쓰는게 좋다.
process.on('uncaughtException', (err) => {
    console.log('예기치 못한 에러: ', err);
}); 