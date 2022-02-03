const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let stack = Array(Number(num)).fill(1).map((el,i) => el + i).reverse();
let temp = [];
let answer = [];

while (arr.length !== 0 && stack.length > 0) {
    let last = stack.pop();
    temp.push(last);
    answer.push("+");
    while (temp.length > 0 && (temp[temp.length-1] == arr[0])) {
        temp.pop();
        arr.shift();
        answer.push("-");
    }
}
console.log(temp.length > 0 ? "NO" : answer.join('\n'));
