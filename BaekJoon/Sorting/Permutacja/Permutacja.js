const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = input.split(' ').map(Number);

const divide = (arr, left, right) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    
    while (left <= right) {
        while (arr[left] < pivot) left++;
        while (pivot < arr[right]) right--;
        if (left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
    
    return left;
}

const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (arr.length < 2) return arr;
    if (left >= right) return arr;
    
    const divided = divide(arr, left, right);
    
    quickSort(arr, left, divided - 1);
    quickSort(arr, divided, right);
    
    return arr;
}

const sorted = quickSort(arr);
const temp = Array(N).fill(1).map((el, idx) => el + idx);
let answer = true;

for (let i = 0; i < N; i++) {
    if (sorted[i] !== temp[i]) {
        answer = false;
        break;
    }
}

console.log(answer ? 'TAK' : 'NIE');
