const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const bubbleSort = arr => {
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0 ; j < arr.length - i - 1 ; j++) {
            if (arr[j] < arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    
    return arr;
}

const [w1, w2, w3] = bubbleSort(inputs.slice(0, 10));
const [k1, k2, k3] = bubbleSort(inputs.slice(10));

console.log(`${w1 + w2 + w3} ${k1 + k2 + k3}`);
