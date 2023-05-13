const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const bubbleSort = (arr) => {
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0 ; j < arr.length - i - 1 ; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    
    return arr;
}

const getSubs = (arr, target) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (target === 1) {
            result.push([arr[i]]);
        } else {
            const temp = getSubs(arr.slice(i+1), target-1);
            temp.forEach(el => result.push([...el, arr[i]]));
        }
    }
    
    return result;
}

const cases = getSubs(inputs, 7);

for (let i = 0 ; i < cases.length ; i++) {
    const sum = cases[i].reduce((acc, cur) => acc + cur, 0);
    if (sum === 100) {
        console.log(bubbleSort(cases[i]).join('\n'));
        break;
    }
}
