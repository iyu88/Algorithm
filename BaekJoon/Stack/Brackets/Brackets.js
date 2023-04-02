const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];

inputs.forEach((el, index) => {
    if (index === inputs.length-1) return;
    
    const stack = [];
    const str = el.split('');
    
    str.forEach(el2 => {
        const last = stack[stack.length - 1];
        if (el2 === ']' && last === '[') stack.pop();
        else if (el2 === '}' && last === '{') stack.pop();
        else if (el2 === ')' && last === '(') stack.pop();
        else if (el2 === '(' || el2 === ')' || el2 === '{' || el2 === '}' || el2 === '[' || el2 === ']') {
            stack.push(el2);
        }
    });
    
    answer.push(stack.length ? 'Illegal' : 'Legal');
});

console.log(answer.join('\n'));
