const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
let [N, M, X, Y, K] = input[index++].split(' ').map(Number);
const map = input.slice(index, index + N).map(el => el.split(' ').map(Number));
const commands = input[index + N].split(' ').map(Number);
const DX = [0, 0, -1, 1];
const DY = [1, -1, 0, 0];
const cube = {
    top: 0,
    back: 0,
    left: 0,
    right: 0,
    front: 0,
    bottom: 0,
}

const moveCube = (direction) => {
    const {top, back, left, right, front, bottom} = cube;
    let arr;
    switch (direction) {
        case 1: 
            arr = [left, back, bottom, top, front, right];
            break;
        case 2:
            arr = [right, back, top, bottom, front, left];
            break;
        case 3:
            arr = [front, top, left, right, bottom, back];
            break;
        case 4:
            arr = [back, bottom, left, right, top, front];
            break;
    }
    
    cube.top = arr[0];
    cube.back = arr[1];
    cube.left = arr[2];
    cube.right = arr[3];
    cube.front = arr[4];
    cube.bottom = arr[5];
}

const answer = [];
commands.forEach(num => {
    X += DX[num-1];
    Y += DY[num-1];
    
    if (X < 0 || Y < 0 || X >= N || Y >= M) {
        X -= DX[num-1];
        Y -= DY[num-1];
        return;
    }
    
    moveCube(+num);
    if (map[X][Y] === 0) {
        map[X][Y] = cube.bottom;
    } else {
        cube.bottom = +map[X][Y];
        map[X][Y] = 0;
    }
    answer.push(cube.top);
});

console.log(answer.join('\n'));
