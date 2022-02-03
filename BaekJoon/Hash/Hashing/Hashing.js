const fs = require('fs');
let [num, str] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let dic = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let answer = [];
str.split('').forEach(el => {
    answer.push(dic.indexOf(el) + 1);
});

console.log(answer.reduce((acc, cur, i) => acc + cur * Math.pow(31, i))); 
