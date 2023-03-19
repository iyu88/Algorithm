const fs = require('fs');
const [num, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const dictArr = Array(N).fill(null).map(_ => []);
let answer = 0;

for (let i = 0 ; i < N ; i++) {
    let chars = input[i];
    for (let j = 0 ; j < chars.length; j++) {
        chars = chars.slice(1) + chars[0];
        dictArr[i].push(chars);
    }
    
    let isChecked = true;
    
    for (let k = 0 ; isChecked && k <= i-1; k++) {
        for (let m = 0 ; isChecked && m < dictArr[k].length; m++) {
            if (dictArr[k].includes(input[i])) isChecked = false;
        }
    }
    
    if (isChecked) answer++;
}

console.log(answer);
