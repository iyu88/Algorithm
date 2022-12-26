const fs = require('fs');
const [N, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

for (let i = 0 ; i < N ; i++) {
    for (let j = i ; j > 0 ; j--) {
        if (arr[j] < arr[j-1]) {
            [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
        } else {
            break;
        }
    }
}

console.log(arr.join('\n'));
