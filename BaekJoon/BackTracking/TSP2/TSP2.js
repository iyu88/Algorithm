const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const board = inputs.map(el => el.split(' ').map(Number));
const visited = Array.from({length: N}, () => false);
let answer = Infinity;

const backTracking = (y, x, sum) => {
    if (x === N-1 && board[y][0]) {
        answer = Math.min(answer, sum + board[y][0]);
        return;
    }
    for (let i = 0 ; i < N ; i++) {
        if (visited[i]) continue;
        if (board[y][i]) {
            visited[i] = true;
            backTracking(i, x + 1, sum + board[y][i]);
            visited[i] = false;
        }
    }
}

visited[0] = true;
backTracking(0, 0, 0)

console.log(answer);
