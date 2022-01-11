const fs = require("fs");
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let answer = [];

arr.forEach(el => {
    let temp = el.split('');
    let stack = [];
    temp.forEach(el2 => {
        if (el2 === ")" && stack[stack.length - 1] === "(") {
            stack.pop();
        } else {
            stack.push(el2);
        }
    }); 
    stack.length === 0 ? answer.push('YES') : answer.push('NO');
});

console.log(answer.join('\n'));
