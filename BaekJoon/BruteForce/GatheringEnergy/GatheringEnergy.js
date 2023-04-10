const fs = require('fs');
const [size, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +size;
const weights = input.split(' ').map(Number);
const visited = Array.from({length: N}, () => false);

let max = 0;

const recursive = (arr, history, energy) => {
    if (history.length === 2) {
        max = Math.max(max, energy);
        return;
    }
    for (let i = 1; i < arr.length-1; i++) {
        recursive([...arr.slice(0, i), ...arr.slice(i+1)], Array.from({length: arr.length-1}, () => false), energy + (arr[i-1] * arr[i+1]));
    }
}

recursive(weights, visited, 0);

console.log(max);
