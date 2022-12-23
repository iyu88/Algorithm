const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = 0;
const N = +num;
const parent = {};
const points = [];
const cows = arr.map(el => el.split(' ').map(Number));

const findParent = (obj, t) => {
    if (obj[t] !== t) obj[t] = findParent(obj, obj[t]);
    return obj[t];
}

const unionFind = (obj, a, b) => {
    a = findParent(obj, a);
    b = findParent(obj, b);
    if (a < b) obj[b] = a;
    else obj[a] = b;
}

const powerPoints = (point1, point2) => Math.pow(point1 - point2, 2);

const calcDist = (x1, y1, x2, y2) => powerPoints(x1, x2) + powerPoints(y1, y2)

for (let i = 0 ; i < N ; i++) {
    const [x1, y1] = cows[i];
    for (let j = i + 1; j < N ; j++) {
        const [x2, y2] = cows[j];
        points.push([i, j, calcDist(x1, y1, x2, y2)]);
    }
}

points.sort((a, b) => a[2] - b[2]).forEach(el => {
    const [a, b, dist] = el;
    if (parent[a] === undefined) parent[a] = a;
    if (parent[b] === undefined) parent[b] = b;
    if (findParent(parent, a) !== findParent(parent, b)) {
        unionFind(parent, a, b);
        answer = Math.max(answer, dist);
    }
});

console.log(answer);
