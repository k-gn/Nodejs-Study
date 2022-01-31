const {URL} = require('url'); // whatwg
const url = require('url');
const querystring = require('querystring');

const myUrl = new URL('http://www.gyul.com/?page=3&limit=10');
console.log(myUrl);

const parseUrl = url.parse('http://www.gyul.com/?page=3&limit=10');
const query = querystring.parse(parseUrl.query);
console.log(parseUrl);
console.log(query);