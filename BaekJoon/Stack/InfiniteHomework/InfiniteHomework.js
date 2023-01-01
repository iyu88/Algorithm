const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const stack = [];
let answer = 0;
let index = -1;

while (++index < arr.length) {
    const [isHomework, reward, minutes] = arr[index].split(' ').map(Number);
    if (isHomework) stack.push([reward, minutes]);
    if (stack.length) {
        if (stack[stack.length - 1][1]) stack[stack.length - 1][1]--;
        if (stack[stack.length - 1][1] === 0) {
            answer += stack[stack.length - 1][0];
            stack.pop();
        }
    }
}

console.log(answer);
