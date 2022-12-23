const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
let index = 0;

const binarySearch = (arr, target) => {
    let start = 0;
    let end = arr.length - 1; 
    let mid;
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        if (Number(arr[mid]) === target) return true;
        Number(arr[mid]) > target ? end = mid - 1 : start = mid + 1;
    }
    return false;
}

while (index < arr.length - 1) {
    let result = 0;
    const [N, M] = arr[index++].split(' ').map(Number);    
    const A = arr.slice(index, index + N);
    arr.slice(index + N, index + N + M).forEach(el => binarySearch(A, Number(el)) && result++);
    answer.push(result);
    index += (N + M);
}

console.log(answer.join('\n'));
