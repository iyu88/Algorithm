const fs = require('fs');
let arr = fs.readFileSync('/dev/stdin').toString().trim().split('');

let answer = [];
while (arr.length) {
    let index = arr.indexOf('.');
    let temp = [];
    if (index !== -1) {
        temp = arr.splice(0, index);
    } else {
        temp = arr.splice(0);
    }
    if (temp.length % 2 !== 0) {
        answer = [-1];
        break;
    } else {
        let item = '';
        item += "AAAA".repeat(Math.floor(temp.length / 4));
        item += "BB".repeat(Math.floor((temp.length % 4) / 2));
        answer.push(item);
    }
    while (arr[0] === '.') {
        answer.push(arr.shift());
    }
}

console.log(answer.join(''));
