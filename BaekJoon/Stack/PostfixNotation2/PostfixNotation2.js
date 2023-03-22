const fs = require('fs');
const [_, str, ...nums] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const stack = [];
const operators = ['+', '-', '/', '*'];

const calcNums = (num1, num2, operator) => {
    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    if (operator === '/') return +(num1 / num2).toFixed(2);
    if (operator === '*') return num1 * num2;
}

const convertToNumber = (char) => {
    return +nums[char.charCodeAt(0) - 65];
}

str.split('').forEach(char => {
    if (!operators.includes(char)) {
        stack.push(convertToNumber(char));
        return;
    }
    const [first, second] = stack.splice(-2, 2);
    const result = calcNums(first, second, char);
    stack.push(result);
});

console.log(stack[0].toFixed(2));
