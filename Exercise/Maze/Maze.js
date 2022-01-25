const fs = require('fs');
let [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M] = nums.split(' ').map(el => +el);
let visited = Array.from(Array(N), () => Array(M).fill(0));
let $map = arr.map(el => el.split('').map(el2 => +el2));

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let q = [[0, 0]];
visited[0][0] = 1;

while (q.length) {
    let [y, x] = q.shift();
    if ($map[y][x]) {
        $map[y][x]--;
        for (let k = 0 ; k < dy.length ; k++) {
            let dyy = dy[k] + y;
            let dxx = dx[k] + x;
            if (dyy < N && dyy > -1 && dxx < M && dxx > -1) {
                if ($map[dyy][dxx] === 1) {
                    visited[dyy][dxx] = visited[y][x] + 1;
                    q.push([dyy, dxx]);
                }
            }
        }
    }
}

console.log(visited[N-1][M-1]);
