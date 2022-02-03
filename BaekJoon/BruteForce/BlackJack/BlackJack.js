const fs = require('fs');
let [mn, nums] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [M, N] = mn.split(' ').map(el => +el);
let arr = nums.split(' ').map(el => +el);

const getSubs = (count, arr) => {
    let answer = [];
    for (let i = 0; i < arr.length; i++) {
        if (count === 1) {
            answer.push(arr[i]);
        } else {
            let result = getSubs(count - 1, [...arr.slice(i+1)]); 
            result.forEach(el => answer.push(arr[i] + el));
        }
    }
    return [...new Set(answer)];
}

let subs = getSubs(3, arr);
let filtered = subs.filter(el => el <= N).sort((a,b) => b - a);
console.log(filtered[0]);
