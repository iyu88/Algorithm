const fs = require('fs');
let num = fs.readFileSync('/dev/stdin').toString().trim();

num = 1000 - num;
let a = Math.floor(num / 500);
let b = Math.floor(num % 500 / 100);
let c = Math.floor(num % 500 % 100 / 50);
let d = Math.floor(num % 500 % 100 % 50 / 10);
let e = Math.floor(num % 500 % 100 % 50 % 10 / 5);
let f = Math.floor(num % 500 % 100 % 50 % 10 % 5 / 1);

console.log(a+b+c+d+e+f);
