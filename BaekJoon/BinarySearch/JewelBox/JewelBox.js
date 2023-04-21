const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

const quick_sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return arr;
    if (arr.length < 2) return arr;
    
    const divided = divide(arr, left, right);
    
    quick_sort(arr, left, divided - 1);
    quick_sort(arr, divided, right);
    
    return arr;
}

const binarySearch = (arr) => {
    let start = 0;
    let end = arr[arr.length - 1]; 
    let mid;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        
        let sum = 0;
        arr.forEach(el => sum += Math.ceil(el / mid));
        
        if (sum > N) {
            start = mid + 1;
        } else {
            answer = Math.min(answer, mid)
            end = mid - 1;
        }
    }
}

const [N, M] = nums.split(' ').map(Number);
const J = quick_sort(arr.map(Number));
let answer = Infinity;

binarySearch(J);

console.log(answer);
