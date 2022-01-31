const exec = require('child_process').exec; // 다른 언어를 호출할 수 있다.

var process = exec('dir');

process.stdout.on('data', function(data) {
    console.log(data.toString());
});

process.stderr.on('data', function(data) { // 에러난 경우
    console.log(data.toString());
});

const spawn = require('child_process').spawn;
const processPy = spawn('python', ['test.py']);

processPy.stdout.on('data', function(data) {
    console.log(data.toString());
});

processPy.stderr.on('data', function(data) { // 에러난 경우
    console.log(data.toString());
});