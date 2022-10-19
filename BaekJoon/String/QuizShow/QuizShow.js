const fs = require('fs');
let [answer, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' '));

let [N, M] = answer;
let index = arr.findIndex(el => el[0] === M);
if (index) {
    console.log(arr.slice(0, index).filter(el => el[1] === arr[index][1]).length);
} else {
    console.log(0);
}
