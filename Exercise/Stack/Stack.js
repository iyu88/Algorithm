const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let s = [];
let answer = [];

arr.forEach(el => {
    let temp = el.split(' ');
    switch (temp[0]) {
        case "push" : 
            s.push(temp[1]);
            break;
        case "pop" :
            let last;
            s.length > 0 ? last = s.pop() : last = -1;
            answer.push(last);
            break;
        case "size" :
            answer.push(s.length);
            break;
        case "empty" :
            s.length > 0 ? answer.push(0) : answer.push(1);
            break;
        case "top" :
            s.length > 0 ? answer.push(s[s.length-1]) : answer.push(-1);
            break;
    }
});

console.log(answer.join('\n'));
