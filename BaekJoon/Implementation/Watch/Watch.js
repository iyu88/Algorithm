const fs = require('fs');
const [size, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n'); 

const [N, M] = size.split(' ').map(Number);
const board = inputs.map(el => el.split(' ').map(Number));
const CCTV = [];
let answer = Infinity;

for (let y = 0 ; y < N ; y++) {
    for (let x = 0 ; x < M ; x++) {
        const value = board[y][x];
        if (value > 0 && value < 6) {
            CCTV.push([y, x]);
        }
    }
}

const copyBoard = (map) => {
    const copy = [];
    map.forEach(el => copy.push(el.slice()));
    return copy;
}

const watchUp = (y, x, copy) => {
    for (let z = y; z > -1; z--) {
        if (z !== y && copy[z][x] > 4) break;
        if (copy[z][x] === 0) copy[z][x] = '#';
    }
    return copy;
}

const watchDown = (y, x, copy) => {
    for (let z = y; z < N; z++) {
        if (z !== y && copy[z][x] > 4) break;
        if (copy[z][x] === 0) copy[z][x] = '#';
    }
    return copy;
}

const watchLeft = (y, x, copy) => {
    for (let z = x; z > -1; z--) {
        if (z !== x && copy[y][z] > 4) break;
        if (copy[y][z] === 0) copy[y][z] = '#';
    }
    return copy;
}

const watchRight = (y, x, copy) => {
    for (let z = x; z < M; z++) {
        if (z !== x && copy[y][z] > 4) break;
        if (copy[y][z] === 0) copy[y][z] = '#';
    }
    return copy;
}

const CCTV1 = (direction, y, x, map) => {
    if (direction === 1) return watchRight(y, x, map);
    else if (direction === 2) return watchDown(y, x, map);
    else if (direction === 3) return watchLeft(y, x, map);
    else return watchUp(y, x, map);
}

const CCTV2 = (direction, y, x, map) => {
    if (direction === 1) return watchRight(y, x, watchLeft(y, x, map));
    else return watchDown(y, x, watchUp(y, x, map));
}

const CCTV3 = (direction, y, x, map) => {
    if (direction === 1) return watchRight(y, x, watchUp(y, x, map));
    else if (direction === 2) return watchRight(y, x, watchDown(y, x, map));
    else if (direction === 3) return watchDown(y, x, watchLeft(y, x, map));
    else return watchUp(y, x, watchLeft(y, x, map));
}

const CCTV4 = (direction, y, x, map) => {
    if (direction === 1) return watchRight(y, x, watchLeft(y, x, watchUp(y, x, map)));
    else if (direction === 2) return watchRight(y, x, watchDown(y, x, watchUp(y, x, map)));
    else if (direction === 3) return watchDown(y, x, watchRight(y, x, watchLeft(y, x, map)));
    else return watchUp(y, x, watchDown(y, x, watchLeft(y, x, map)));
}

const CCTV5 = (y, x, map) => {
    return watchUp(y, x, watchDown(y, x, watchLeft(y, x, watchRight(y, x, map))));
}

const recursion = (index, map) => {
    if (index === CCTV.length) {
        let count = 0;
        for (let i = 0 ; i < N ; i++) {
            for (let j = 0 ; j < M ; j++) {
                if (map[i][j] === 0) count++;
            }
        }
        answer = Math.min(answer, count);
        return;
    }
    
    const [y, x] = CCTV[index];

    switch (map[y][x]) {
        case 1: 
            for (let k = 1 ; k < 5; k++) {
                const copy = copyBoard(map);
                recursion(index + 1, CCTV1(k, y, x, copy));
            }
            break;
        case 2:
            for (let k = 1 ; k < 3; k++) {
                const copy = copyBoard(map);
                recursion(index + 1, CCTV2(k, y, x, copy));
            }
            break;
        case 3:
            for (let k = 1 ; k < 5; k++) {
                const copy = copyBoard(map);
                recursion(index + 1, CCTV3(k, y, x, copy));
            }
            break;
        case 4:
            for (let k = 1 ; k < 5; k++) {
                const copy = copyBoard(map);
                recursion(index + 1, CCTV4(k, y, x, copy));
            }
            break;
        case 5:
            const copy = copyBoard(map);
            recursion(index + 1, CCTV5(y, x, copy));
            break;
    }
}

recursion(0, board);

console.log(answer);
