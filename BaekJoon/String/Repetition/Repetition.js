const fs = require('fs');
let str = fs.readFileSync('/dev/stdin').toString().trim().split('');

let answer = 0;
let dict = Array.from('abcdefghijklmnopqrstuvwxyz');

for (let i = 0 ; i < str.length; i++) {
    let index = dict.indexOf(str[i]);
    let next = dict.indexOf(str[i+1]);
    while (index < next) {
        i++;
        index = next;
        next = dict.indexOf(str[i+1]);
    }
    answer++;
}

console.log(answer);