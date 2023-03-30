const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = inputs.map(str => {
    const len = str.length;
    let end = -1;
    
    for (let i = 0 ; i < len-1 ; i++) {
        if (str[i] < str[i+1]) end = i;
    }
    
    if (end === -1) return str;
    
    let target;
    for (let i = len-1 ; i > -1 ; i--) {
        if (str[end] < str[i]) {
            target = i;
            break;
        }
    }
    
    const swapped = str.substring(0, end) + str[target] + str.substring(end+1, target) + str[end] + str.substring(target+1);   
    const pre = swapped.substring(0, end+1);
    const sub = swapped.substring(end+1).split('').reverse().join('');
    
    return pre.concat(sub);
});

console.log(answer.join('\n'));
