const fs = require('fs');
const [_, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const stack = [];
let index = 1;

input.split(' ').forEach(el => {
    while (stack[stack.length - 1] === index) {
        index++;
        stack.pop();
    }
    if (+el === index) index++;
    else stack.push(+el);
});

while (stack[stack.length - 1] === index) {
    index++;
    stack.pop();
}

console.log(stack.length ? 'Sad' : 'Nice');
