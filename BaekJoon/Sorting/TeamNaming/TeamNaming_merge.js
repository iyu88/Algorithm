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

const mergeSort = arr => {
    if (arr.length < 2) return arr;
    
    const mid = Math.floor((arr.length + 1) / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] > right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    
    while (i < left.length) result.push(left[i++]);
    
    while (j < right.length) result.push(right[j++]);
    
    return result;
}

const [ max ] = mergeSort(Object.values(O));

console.log(Object.keys(O).filter(key => O[key] === max).sort((a, b) => a.localeCompare(b))[0]);
