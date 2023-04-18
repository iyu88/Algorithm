const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
const chars = new RegExp('[a-z]', 'g');

arr.forEach(el => {
    const splited = [...el.replaceAll(chars, ' ')];
    let nextNum = '';
    splited.forEach(el2 => {
        if (el2 === ' ') {
            if (nextNum !== '') {
                answer.push(nextNum); 
                nextNum = ''; 
            }
        } else nextNum += el2;
    });
    if (nextNum !== '') answer.push(nextNum);
});

console.log(answer.sort((a, b) => a - b).map(BigInt).join('\n'));
