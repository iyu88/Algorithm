const fs = require('fs');
const [size, _, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = 0;
const [N, M] = size
               .split(' ')
               .map(Number);

const [[DIR, DIST]] = input
                    .splice(-1, 1)
                    .map(el => el.split(' ').map(Number));

const TOTAL_DIST = (N * 2) + (M * 2);

const calcDistance = (dir, dist) => {
    if (dir === 1) return dist;
    if (dir === 2) return N + M + N - dist;
    if (dir === 3) return N + M + N + M - dist;
    if (dir === 4) return N + dist;
}

const GUARD_DIST = calcDistance(DIR, DIST);

input.forEach(el => {
    const [dir, dist] = el.split(' ').map(Number);
    const store_dist = calcDistance(dir, dist);
    const dist_diff = Math.abs(GUARD_DIST - store_dist);
    answer += Math.min(TOTAL_DIST - dist_diff, dist_diff);
});

console.log(answer);
