const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, R] = nums.split(' ').map(Number);
const visited = Array(N+1).fill(-1);
let points = Array.from(Array(N+1), () => []);

arr.forEach(el => {
    const [pointA, pointB] = el.split(' ').map(Number);
    points[pointA].push(pointB);
    points[pointB].push(pointA);
});

points = points.map(point => point.sort((a, b) => a - b));

const dfs = (currentPoint, currentOrder) => {
    for (const nextPoint of points[currentPoint]) {
        if (visited[nextPoint] === -1) {
            visited[nextPoint] = currentOrder + 1;
            dfs(nextPoint, currentOrder + 1);
        }
    }
}

let order = 0;
visited[R] = order;
dfs(R, order);

console.log(visited.slice(1).join('\n'));
