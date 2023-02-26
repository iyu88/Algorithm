const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = {};

arr.forEach(el => {
    const [name, status] = el.split(' ');
    if (status === 'enter') {
        answer[name] = 1;
    } else {
        if (answer[name]) answer[name] = 0;
    }
});

console.log(Object.keys(answer).filter(key => answer[key]).sort().reverse().join('\n'));

