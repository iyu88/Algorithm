const fs = require('fs');
const [_, spell] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = 0;
let LR = 0;
let SK = 0;
let checked = true;

for (let i = 0 ; i < spell.length ; i++) {
    if (checked === false) break;
    
    switch (spell[i]) {
        case 'L':
            LR++;
            break;
        case 'S':
            SK++;
            break;
        case 'R':
            if (LR === 0) {
                checked = false;
            } else {
                answer++;
                LR--;
            }
            break;
        case 'K':
             if (SK === 0) {
                checked = false;
            } else {
                answer++;
                SK--;
            }
            break;
        default: 
            answer++;
    }
}

console.log(answer);
