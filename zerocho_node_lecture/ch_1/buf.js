// 버퍼 : 일정한 크기로 모아두는 데이터

// 스트림 : 데이터의 흐름

const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
console.log(Buffer.concat(array).toString()); // 버퍼 합치기

console.log(Buffer.alloc(5)); // 빈 버퍼