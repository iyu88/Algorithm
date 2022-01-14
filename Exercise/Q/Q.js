const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num;
let q = [];
let answer = [];
arr.forEach(el => {
    let temp = el.split(' ');
    switch (temp[0]) {
        case "push" : 
            q.push(temp[1]);
            break;
        case "pop" :
            let $pop;
            q.length > 0 ? $pop = q.shift() : $pop = -1;
            answer.push($pop);
            break;
        case "size" :
            answer.push(q.length);
            break;
        case "empty" :
            q.length === 0 ? answer.push(1) : answer.push(0);
            break;
        case "front" :
            q.length > 0 ? answer.push(q[0]) : answer.push(-1);
            break;
        case "back" :
            q.length > 0 ? answer.push(q[q.length-1]) : answer.push(-1);
            break;
    }
});

console.log(answer.join('\n'));
