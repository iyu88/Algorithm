const fs = require('fs');
const [n, arr, x] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const divide = (arr, low, high) => {
    const pivot = arr[Math.floor((low + high) / 2)];
    while (low <= high) {
        while (arr[low] < pivot) low++;
        while (arr[high] > pivot) high--;
        if (low <= high) {
            [arr[low], arr[high]] = [arr[high], arr[low]];
            low++;
            high--;
        }
    }
    
    return low;
}

const quick_sort = (arr, low = 0, high = arr.length - 1) => {
    if (low >= high) return arr;
    if (arr.length < 2) return arr;
    
    const divided = divide(arr, low, high);
    
    quick_sort(arr, low, divided - 1);
    quick_sort(arr, divided, high);
    
    return arr;
}

const twoPointer = (arr, target) => {
    let answer = 0;
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
        let sum = arr[start] + arr[end];
        if (sum === target) {
            answer++;
            start++;
        }
        if (sum > target) end--;
        if (sum < target) start++;
    }
    return answer;
}

console.log(twoPointer(quick_sort(arr.split(' ').map(Number)), +x));
