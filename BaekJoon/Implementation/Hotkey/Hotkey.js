const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dict = {};
const answer = [];

inputs.forEach(el => {
    const words = el.split(' ');
    const temp = [];
    let isFind = -1;
    
    for (const [idx, w] of words.entries()) {
        const char = w[0].toUpperCase();
        if (isFind !== -1 || dict[char]) {
            temp.push(w);
            continue;
        }
        dict[char] = true;
        temp.push('[' + w[0] + ']' + w.substring(1));
        isFind = idx;
    }
    
    if(isFind !== -1) {
        answer.push(temp.join(' '));
    } else {
        
        for (let i = 0 ; i < el.length ; i++) {
            if (el[i] === ' ') continue;
            
            const capital = el[i].toUpperCase();
            if (dict[capital]) continue;
            dict[capital] = true;
            isFind = i;
            break;
        }
        
        if (isFind !== -1) {
            answer.push(el.substring(0, isFind) + '[' + el[isFind] + ']' + el.substring(isFind + 1));
        } else {
            answer.push(el);
        }
    }
});

console.log(answer.join('\n'));
