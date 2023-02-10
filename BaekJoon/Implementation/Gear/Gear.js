const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let saw_tooth = input.splice(0, 4);
saw_tooth = saw_tooth.map(el => el.split('').map(Number));
saw_tooth.unshift([]);
const [command_count, ...commands] = input.map(el => el.split(' ').map(Number));
const RIGHT_INDEX = 2;
const LEFT_INDEX = 6;
let rotations;

const isSameSawValue = (previousOrder, previousIndex, currentOrder, currentIndex) => {
    return saw_tooth[previousOrder][previousIndex] === saw_tooth[currentOrder][currentIndex];
}

const setReverseDirection = (previousOrder, currentOrder) => {
    rotations[currentOrder] = rotations[previousOrder] === 1 ? -1 : 1;
}

const decide_direction = (currentOrder, previousOrder = null) => {
    if (currentOrder === 1) {
        if (previousOrder === 2) {
            if (!isSameSawValue(previousOrder, LEFT_INDEX, currentOrder, RIGHT_INDEX)) setReverseDirection(previousOrder, currentOrder);
        }
        else decide_direction(2, currentOrder);
    }
    if (currentOrder === 2) {
        if (previousOrder === 1) {
            if (!isSameSawValue(previousOrder, RIGHT_INDEX, currentOrder, LEFT_INDEX)) {
                setReverseDirection(previousOrder, currentOrder);
                decide_direction(3, currentOrder);
            }
        } else if (previousOrder === 3) {
            if (!isSameSawValue(previousOrder, LEFT_INDEX, currentOrder, RIGHT_INDEX)) {
                setReverseDirection(previousOrder, currentOrder);
                decide_direction(1, currentOrder);
            }
        } else {
            decide_direction(1, currentOrder);
            decide_direction(3, currentOrder);
        }
    }
    if (currentOrder === 3) {
        if (previousOrder === 2) {
            if (!isSameSawValue(previousOrder, RIGHT_INDEX, currentOrder, LEFT_INDEX)) {
                setReverseDirection(previousOrder, currentOrder);
                decide_direction(4, currentOrder);
            }
        } else if (previousOrder === 4) {
            if (!isSameSawValue(previousOrder, LEFT_INDEX, currentOrder, RIGHT_INDEX)) {
                setReverseDirection(previousOrder, currentOrder);
                decide_direction(2, currentOrder);
            }
        } else {
            decide_direction(2, currentOrder);
            decide_direction(4, currentOrder);
        }
    }
    if (currentOrder === 4) {
        if (previousOrder === 3) {
            if (!isSameSawValue(previousOrder, RIGHT_INDEX, currentOrder, LEFT_INDEX)) setReverseDirection(previousOrder, currentOrder);
        }
        else decide_direction(3, currentOrder);
    }
}

const rotateClockwise = (index) => {
    const last = saw_tooth[index].pop();
    saw_tooth[index].unshift(last);
}

const rotateReverseClockwise = (index) => {
    const first = saw_tooth[index].shift();
    saw_tooth[index].push(first);
}

const rotate_action_map = {
    "0": (_) => null,
    "1": rotateClockwise,
    "-1": rotateReverseClockwise,
}

const calcScore = () => {
    const scores = [1, 2, 4, 8];
    return saw_tooth.slice(1).reduce((acc, cur, index) => (cur[0] === 1 ? scores[index] : 0) + acc, 0);
}

commands.forEach(command => {
    const [target, direction] = command;
    rotations = Array(5).fill(0);
    rotations[target] = direction;
    decide_direction(target);
    rotations.forEach((el, index) => rotate_action_map[el](index));
});

console.log(calcScore());
