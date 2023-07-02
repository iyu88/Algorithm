const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bubbleSort = (arr) => {
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0 ; j < arr.length - 1 - i ; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    
    return arr;
}

let order = 1;
let index = 0;

while (index < inputs.length - 1) {
    const count = +inputs[index++];
    const names = inputs.slice(index, index + count);
    
    console.log(order++);
    console.log(bubbleSort(names).join('\n'));
    
    index += count;
}
