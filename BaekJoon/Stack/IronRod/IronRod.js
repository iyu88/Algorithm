const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim().split('');

const stack = [];
let count = 0;

str.forEach((el, index) => {
    if (el === '(') {
        stack.push(el);
    } else {
        if (str[index-1] === '(') {
            stack.pop();
            count += stack.length;
        } else {
            stack.pop();
            count++;
        }
    }
});

console.log(count);
