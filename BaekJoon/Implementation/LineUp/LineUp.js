const fs = require('fs');
const [_, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const N = arr.length;
const answer = Array(N).fill(0);
const visited = Array(N).fill(false);

for (let i = 0; i < N; i++) {
    const num = arr[i];
    let count = 0;
    
    for (let j = 0 ; j < N; j++) {
        if (visited[j] === false) {
            if (count === num) {
                visited[j] = true;
                answer[j] = i + 1;
                break;
            }
            count++;
        }
    }
}

console.log(answer.join(' '));
