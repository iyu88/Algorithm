const fs = require('fs');
let [size, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let room = size.split(' ').map(el => +el);
let design = arr.map(el => el.split(''));
let answer = 0;

for (let i = 0 ; i < room[0]; i++) {
    let flag = true;
    for (let j = 0 ; j < room[1]; j++) {
        if (flag === true && design[i][j] === '-') {
            answer++;
            flag = false;
        } else if (design[i][j] === '|') {
            flag = true;
        } 
    }
}

for (let i = 0 ; i < room[1]; i++) {
    let flag = true;
    for (let j = 0 ; j < room[0]; j++) {
        if (flag === true && design[j][i] === '|') {
            answer++;
            flag = false;
        } else if (design[j][i] === '-') {
            flag = true;
        } 
    }
}

console.log(answer);
