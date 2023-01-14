const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = 0;

arr.forEach(el => {
    const stack = [];
    const strArr = el.split('');
    strArr.forEach(el => {
        if (stack.length && el === stack[stack.length - 1]) stack.pop();
        else stack.push(el);
    });
    if (stack.length === 0) answer++;
});

console.log(answer);
