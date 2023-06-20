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

const divide = (arr, left, right) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    
    while (left <= right) {
        while (arr[left] > pivot) left++;
        while (pivot > arr[right]) right--;
        if (left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
    
    return left;
}

const quickSort = (arr, left = 0 , right = arr.length - 1) => {
    if (left >= right) return arr;
    if (arr.length < 2) return arr;
    
    const divided = divide(arr, left, right);
    
    quickSort(arr, left, divided - 1);
    quickSort(arr, divided, right);
    
    return arr;
}

const [ max ] = quickSort(Object.values(O));

console.log(Object.keys(O).filter(key => O[key] === max).sort((a, b) => a.localeCompare(b))[0]);
