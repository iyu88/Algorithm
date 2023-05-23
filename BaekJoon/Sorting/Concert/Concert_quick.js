const fs = require('fs');
const [_, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

const sorted = quickSort(arr.split(' ').map(Number));

for (let i = 1; i <= 1000000; i++) {
    if (sorted[i-1] !== i) {
        console.log(i);
        break;
    }
}
