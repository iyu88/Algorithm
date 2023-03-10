const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim().split('');

const stack = [];

str.forEach(char => {
    if (isNaN(Number(char))) {
        const first = stack.pop();
        const second = stack.pop();
        const result = eval(`${second}${char}${first}`);
        stack.push(result);
    } else {
        stack.push(char);
    }
});

console.log(stack[0]);
