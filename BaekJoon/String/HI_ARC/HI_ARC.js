const fs = require('fs');
const [num, str] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = {};
const dict = ["H", "I", "A", "R", "C"];

str.split('').forEach(el => {
    if (dict.includes(el)) {
        if (answer[el] === undefined) answer[el] = 1;
        else answer[el]++;
    }
});

if (Object.keys(answer).length === 5) {
    console.log(Math.min(...Object.values(answer)));
} else {
    console.log(0);
}
