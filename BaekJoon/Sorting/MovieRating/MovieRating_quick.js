const fs = require('fs');
const [nums, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const divide = (arr, left, right) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    while (left <= right) {
        while (arr[left] < pivot) left++;
        while (arr[right] > pivot) right--;
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

const [N, L, H] = nums.split(' ').map(Number);
const scores = arr.split(' ').map(Number);

const sorted = quickSort(scores);
const sum = sorted.slice(L, N-H).reduce((acc, cur) => acc + cur, 0);

console.log(sum / (N-H-L));
