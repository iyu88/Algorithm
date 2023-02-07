const fs = require('fs');
const [count, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const C = +count;
const dices = arr.map(dice => dice.split(' ').map(Number));
const answer = [];
let sum;
let last_selection;

const filteringIndexes = (origin, indexes) => origin.filter((_, index) => !indexes.includes(index));

const getOppositeIndex = (index) => {
    const selection_pair = [5, 3, 4, 1, 2, 0];
    return selection_pair[index];
}

for (let i = 0; i < 6; i++) {
    last_selection = dices[0][i];
    sum = Math.max(...filteringIndexes(dices[0], [i, getOppositeIndex(i)]));
    for (let j = 1; j < C; j++) {
        for (let k = 0; k < 6; k++) {
            if (last_selection === dices[j][k]) {
                const opposite_index = getOppositeIndex(k);
                last_selection = dices[j][opposite_index];
                sum += Math.max(...filteringIndexes(dices[j], [k, opposite_index]));
                break;
            }
        }
    }
    answer.push(sum);
}

console.log(Math.max(...answer));
