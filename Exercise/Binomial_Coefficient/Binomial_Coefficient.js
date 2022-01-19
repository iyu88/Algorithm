const fs = require('fs');
let [n, k] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(el => +el);

let answer = [];
let arr = Array(n).fill(1).map((el, i) => el + i);

function getSub (count, arr) {
    let answer = [];
    if (count === 0) return [0];
    for (let i = 0; i < arr.length; i++) {
        if (count === 1) {
            answer.push(arr[i]); 
        } else {
            let result = getSub(count - 1, [...arr.slice(i+1)]);
            result.forEach(el => answer.push(arr[i] + el));
        }
    }
    return answer;
}

console.log(getSub(k, arr).length);
