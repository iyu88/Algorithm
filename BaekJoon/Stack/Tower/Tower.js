const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = input.split(' ').map(Number);
const answer = [];
const stack = [];

arr.forEach((el, idx) => {
    while (stack.length && arr[stack[stack.length - 1]] < el) stack.pop();
    
    answer.push(stack.length === 0 
                ? 0 
                : stack[stack.length - 1] + 1);
    
    stack.push(idx);
});

console.log(answer.join(' '));
