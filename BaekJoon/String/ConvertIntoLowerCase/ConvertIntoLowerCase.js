const fs = require('fs');
let [str, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const len = arr.split(' ').length;
console.log(arr.split(' ').map(el => str = str.replaceAll(el, el.toLowerCase()))[len-1]);
