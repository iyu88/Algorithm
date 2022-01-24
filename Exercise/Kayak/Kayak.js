const fs = require('fs');
let [nums, temp1, temp2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, S, R] = nums.split(' ').map(el => +el);
let broken = temp1.split(' ').map(el => +el);
let spare = temp2.split(' ').map(el => +el);
let both = broken.filter(el => spare.includes(el));
broken = broken.filter(el => !both.includes(el));
spare = spare.filter(el => !both.includes(el));

let borrowed = Array(N).fill(false);
let arr = Array.from(Array(N).fill(1), (el, i) => {
    if (broken.includes(el + i)) {
        return 0;
    } else if (spare.includes(el + i)) {
        return 2;
    } else {
        return 1;
    }
})

for (let i = 0 ; i < N ; i++) {
    if (arr[i] === 2) {
        if (arr[i-1] === 0 && !borrowed[i-1]) {
            arr[i]--;
            arr[i-1]++;
            borrowed[i-1] = true;
        } else if (arr[i+1] === 0 && !borrowed[i+1]) {
            arr[i]--;
            arr[i+1]++;
            borrowed[i+1] = true;
        }
    }
}

console.log(arr.filter(el => el === 0).length);
