const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
let answer;

const sorted = inputs.map(el => el.split(' ').map(Number)).sort((a, b) => b[1] - a[1]);

for (const task of sorted) {
    const [duration, deadline] = task;
    
    if (answer === undefined) answer = deadline;
    if (answer > deadline) {
	    answer = deadline -  duration;
    } else {
	    answer -= duration;
    }
    
    if (answer <= 0) {
        answer = -1;
        break;
    }
}

console.log(answer);
