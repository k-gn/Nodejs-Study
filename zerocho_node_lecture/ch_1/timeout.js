// setTimeout(콜백, 밀리초) : 밀리초 후 콜백 실행
// setInterval(콜백, 밀리초) : 밀리초 마다 콜백 실행
// setImmediate(콜백) : 콜백 바로 실행
// clearTimeout(아이디) : setTimeout 취소
// clearInterval(아이디) : setInterval 취소
// clearImmediate(아이디) : setImmediate 취소
// 타이머 함수는 백그라운드로 넘어간다 => 동시에 실행이 가능해진다 (비동기 코드) / Promiss + then

const hello = setTimeout(() => console.log('hi'), 2000);
clearTimeout(hello);