const fs = require('fs');
const [num, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
let gears = input.splice(0, N);
gears = gears.map(el => el.split('').map(Number));
gears.unshift([]);
const [command_count, ...commands] = input.map(el => el.split(' ').map(Number));
const RIGHT_INDEX = 2;
const LEFT_INDEX = 6;
let rotations;

const isSameSawValue = (previousOrder, previousIndex, currentOrder, currentIndex) => {
    return gears[previousOrder][previousIndex] === gears[currentOrder][currentIndex];
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
        return;
    }
    if (currentOrder === N) {
        if (previousOrder === N-1) {
            if (!isSameSawValue(previousOrder, RIGHT_INDEX, currentOrder, LEFT_INDEX)) setReverseDirection(previousOrder, currentOrder);
        }
        else decide_direction(N-1, currentOrder);
        return;
    }
    if (previousOrder === currentOrder - 1) {
        if (!isSameSawValue(previousOrder, RIGHT_INDEX, currentOrder, LEFT_INDEX)) {
            setReverseDirection(previousOrder, currentOrder);
            decide_direction(currentOrder + 1, currentOrder);
        }
    } else if (previousOrder === currentOrder + 1) {
        if (!isSameSawValue(previousOrder, LEFT_INDEX, currentOrder, RIGHT_INDEX)) {
            setReverseDirection(previousOrder, currentOrder);
            decide_direction(currentOrder - 1, currentOrder);
        }
    } else {
        decide_direction(currentOrder - 1, currentOrder);
        decide_direction(currentOrder + 1, currentOrder);
    }
}

const rotateClockwise = (index) => {
    const last = gears[index].pop();
    gears[index].unshift(last);
}

const rotateReverseClockwise = (index) => {
    const first = gears[index].shift();
    gears[index].push(first);
}

const rotate_action_map = {
    "0": (_) => null,
    "1": rotateClockwise,
    "-1": rotateReverseClockwise,
}

const countS = () => gears.slice(1).filter(gear => gear[0] === 1).length;

commands.forEach(command => {
    const [target, direction] = command;
    rotations = Array(5).fill(0);
    rotations[target] = direction;
    decide_direction(target);
    rotations.forEach((el, index) => rotate_action_map[el](index));
});

console.log(countS());
