const fs = require('fs');
let [num, str] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let regExp = new RegExp('[a-zA-Z]', 'g');
console.log(str.split(regExp).flat().reduce((acc, cur) => acc + Number(cur), 0));
