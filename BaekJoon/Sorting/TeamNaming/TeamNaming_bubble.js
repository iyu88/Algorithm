const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = inputs[0];
const LOVE = ['L', 'O', 'V', 'E'];
const O = {};

const getScore = name => {
    const counts = Array(4).fill(0);
    
    for (let i = 0 ; i < 4 ; i++) {
        const char = LOVE[i];
        const longerLength = Math.max(T.length, name.length);
        for (let j = 0; j < longerLength; j++) {
            if (T[j] && T[j] === char) counts[i]++;
            if (name[j] && name[j] === char) counts[i]++;
        }
    }
    
    let sum = 1;
    for (let i = 0 ; i < 4 - 1 ; i++) {
        for (let j = i + 1 ; j < 4 ; j++ ) {
            sum *= (counts[i] + counts[j]);
        }
    }
    
    return sum % 100;
}

for (let i = 2; i < inputs.length; i++) {
    O[inputs[i]] = getScore(inputs[i]);
}

const bubbleSort = arr => {
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0 ; j < arr.length - i - 1; j++) {
            if (arr[j] < arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    
    return arr;
}

const [ max ] = bubbleSort(Object.values(O));

console.log(Object.keys(O).filter(key => O[key] === max).sort((a, b) => a.localeCompare(b))[0]);
