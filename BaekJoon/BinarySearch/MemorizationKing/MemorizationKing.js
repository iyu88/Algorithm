const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
let index = 0;

const binarySearch = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;
    let mid = Math.floor((start + end) / 2);
    while (start <= end) {
        if (target === arr[mid]) return true;
        else if (target < arr[mid]) end = mid - 1;
        else if (target > arr[mid]) start = mid + 1;
        mid = Math.floor((start + end) / 2);
    }
    return false;
}

while (index < arr.length) {
    const [len1, note1, len2, note2] = arr.slice(index, index + 4);
    const memory = note1.split(' ').map(Number).sort((a, b) => a - b);
    note2.split(' ').map(el => answer.push(binarySearch(memory, Number(el)) ? 1 : 0));    
    index = index + 4;
}

console.log(answer.join('\n'));
