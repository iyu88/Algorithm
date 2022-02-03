const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

for (let i = 0 ; i < num; i++) {
    let temp = arr[i].split(' ').map(el => +el);
    let answer = [(temp[2] % temp[0] === 0 ? temp[0] : temp[2] % temp[0]), Math.ceil(temp[2] / temp[0])];
    console.log(answer[1] < 10 ? answer.join('0') : answer.join(''));
}
