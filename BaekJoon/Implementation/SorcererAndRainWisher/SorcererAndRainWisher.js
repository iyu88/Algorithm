const fs = require('fs');
const [size, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = size.split(' ').map(Number);
const DY = [null, 0, -1, -1, -1, 0, 1, 1, 1];
const DX = [null, -1, -1, 0, 1, 1, 1, 0, -1];
const $map = arr.slice(0, N).map(row => row.split(' ').map(Number));
const movements = arr.slice(N);
let currentClouds;
let previousClouds;

const initClouds = () => currentClouds = Array.from(Array(N), () => Array(N).fill(false));

const makeClouds = () => {
    for (let y = N-2; y < N; y++) {
        for (let x = 0; x < 2; x++) {
            currentClouds[y][x] = true;
        }
    }
}

const correctPoint = (value) => {
    let point = value % N;
    return point < 0 ? point + N : point;
}

const moveClouds = (direction, distance) => {
    previousClouds = currentClouds;
    initClouds();
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if (previousClouds[y][x]) {
                const nextY = correctPoint(distance * DY[direction] + y);
                const nextX = correctPoint(distance * DX[direction] + x);
                currentClouds[nextY][nextX] = true;
                $map[nextY][nextX]++;
            }
        }
    }
}

const duplicateWater = () => {
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if (currentClouds[y][x]) {
                let bucketCount = 0;
                for (let k = 2; k < 9; k += 2) {
                    const nextY = y + DY[k];
                    const nextX = x + DX[k];
                    if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= N) continue;
                    if ($map[nextY][nextX]) bucketCount++;
                }
                $map[y][x] += bucketCount;
            }
        }
    }
}

const decreaseWater = () => {
    previousClouds = currentClouds;
    initClouds();
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            if ($map[y][x] >= 2 && previousClouds[y][x] === false) {
                $map[y][x] -= 2;
                currentClouds[y][x] = true;
            }
        }
    }
}

const calculateTotalWater = () => {
    let sum = 0;
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            sum += $map[y][x];
        }
    }
    return sum;
}

initClouds();
makeClouds();
movements.forEach(movement => {
    const [direction, distance] = movement.split(' ').map(Number);
    moveClouds(direction, distance);
    duplicateWater();
    decreaseWater();
});

console.log(calculateTotalWater());
