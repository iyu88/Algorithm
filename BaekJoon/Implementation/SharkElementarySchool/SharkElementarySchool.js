const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
const SCORE = [0, 1, 10, 100, 1000];
const room = Array.from(Array(N), () => Array(N).fill(null));
const students = [];
let favorites = {};
let answer = 0;

input = input.slice(1).map(el => el.split(' ').map(Number));

for (let elem of input) {
    students.push(elem[0]);
    favorites[elem[0]] = elem.slice(1);
}

for (let student of students) {
    let candidates = {};
    
    for (let y = 0 ; y < N ; y++) {
        for (let x = 0 ; x < N ; x++) {
            if (room[y][x] !== null) continue;
            const count = [0, 0];
            
            for (let k = 0 ; k < 4 ; k++) {
                const dyy = y + DY[k];
                const dxx = x + DX[k];
                if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
                if (favorites[student].includes(room[dyy][dxx])) count[0]++;
                if (room[dyy][dxx] === null) count[1]++;
            }
            
            const key = JSON.stringify(count);
            
            if (candidates[key] === undefined) candidates[key] = [[y, x]];
            else candidates[key].push([y, x]);
        }
    }
    
    const sorted = Object.keys(candidates).sort((a, b) => {
        const [ay, ax] = JSON.parse(a);
        const [by, bx] = JSON.parse(b);
        return ay !== by ? by - ay : bx - ax;
    });
    
    const [resultY, resultX] = candidates[sorted[0]][0];
    room[resultY][resultX] = student;
}

for (let student of students) {
    let count = 0;
    
    for (let y = 0 ; y < N ; y++) {
        for (let x = 0 ; x < N ; x++) {
            if (room[y][x] === student) {
                for (let k = 0 ; k < 4 ; k++) {
                    const dyy = y + DY[k];
                    const dxx = x + DX[k];
                    if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
                    if (favorites[student].includes(room[dyy][dxx])) count++;
                }
            }
        }
    }
    
    answer += SCORE[count];
}

console.log(answer);
