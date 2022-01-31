const path = require("path");

path.join(__dirname, 'var.js');

path.join(__dirname, '..', 'var.js'); // 부모로 올라감

path.resolve(__dirname, '..', '/var.js'); // 절대경로 적용