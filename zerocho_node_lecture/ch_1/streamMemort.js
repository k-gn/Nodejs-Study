const fs = require('fs');
// 스트림으로 옮기기
console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);

readStream.on('end', () => {
    console.log('stream: ', process.memoryUsage().rss);
});


/*
    fs.access : 폴더가 있는지 접근 여부 확인

    fs.mkdir : 폴더 생성

    fs.open : 파일의 아이디 가져오기 / 파일 생성 or 추가 (w, r, a)

    fs.rename : 파일 이름 변경

    fs.readdir : 폴더 안의 내용물 확인

    fs.unlink : 파일 제거 가능

    fs.rmdir : 폴더 제거 가능

    fs.copyFile : 파일 복사

    fs.watch : 파일 감시 (변경 발생 시 이벤트 호출)

    fs.existsSync : 파일 존재 여부 확인
    
    fs.stat : 파일의 속성 확인 (폴더인지 파일인지 등) 

    이 외에도 다양한 fs 함수가 존재(공식 문서 참조)
*/