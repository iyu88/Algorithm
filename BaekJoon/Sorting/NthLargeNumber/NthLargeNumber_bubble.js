const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bubbleSort = (arr) => {
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0 ; j < arr.length - i - 1 ; j++) {
            if (arr[j] < arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped = false) break;
    }
    
    return arr;
}

const answer = inputs.map(el => {
    const nums = el.split(' ').map(Number);
    return bubbleSort(nums)[2];
});

console.log(answer.join('\n'));
