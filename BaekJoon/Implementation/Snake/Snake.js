const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
const N = +inputs[index++];
const K = +inputs[index++];
const apples = inputs.slice(index, index + K);
index += K;
const L = +inputs[index++];
const moves = inputs.slice(index, index + L).map(el => el.split(' '));
const $map = Array.from({length: N}, () => Array.from({length: N}, () => 0));

apples.forEach(apple => {
    const [y, x] = apple.split(' ');
    $map[y-1][x-1] = 1;
});

const DY = [0, -1, 0, 1];
const DX = [1, 0, -1, 0];

let direction = 0;
let times = 0;
let moveIdx = 0;
let flag = true;

let snake = [];
const pos = {Y: 0, X: 0};
snake.push(pos);
$map[0][0] = 2;

while (flag) {
    times++;
    
    const DYY = DY[direction] + snake[0]['Y'];
    const DXX = DX[direction] + snake[0]['X'];
    if (DYY < 0 || DXX < 0 || DYY >= N || DXX >= N) break;
    if ($map[DYY][DXX] === 1) {
        const pos = {Y: DYY, X: DXX};
        snake.unshift(pos);
        $map[DYY][DXX] = 2;
    } else if ($map[DYY][DXX] === 0) {
        const pos = {Y: DYY, X: DXX};
        snake.unshift(pos);
        $map[DYY][DXX] = 2;
	      const {Y: lastY, X: lastX} = snake.pop();
        $map[lastY][lastX] = 0;
    } else {
        flag = false;
    }
    
    if (moveIdx < moves.length && times === +moves[moveIdx][0]) {
        const turn = moves[moveIdx][1];
        if (turn === 'L') {
            direction = (direction + 1) % 4;
        } else if (turn === 'D') {
            direction = direction - 1 < 0 ? 3 : direction - 1;
        }
        moveIdx++;
    }
}

console.log(times);
