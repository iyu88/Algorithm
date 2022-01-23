const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => +el);

let vote = 0;
while (arr[0] <= Math.max(...arr.slice(1))) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === Math.max(...arr.slice(1))) {
            arr[i]--;
            arr[0]++;
            vote++;
            if (arr[0] > Math.max(...arr.slice(1))) {
                break;
            }
        }
    }
}

console.log(vote);
