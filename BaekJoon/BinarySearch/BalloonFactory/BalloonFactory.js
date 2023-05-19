const fs = require('fs');
const [nums, staffs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [_, M] = nums.split(' ').map(Number);
const S = staffs.split(' ').map(Number).sort((a, b) => a - b);

const getTotal = (value) => {
    return S.reduce((acc ,cur) => acc + Math.floor(value / cur), 0);
}

const binarySearch = () => {
    let start = 0;
    let end = 1000000000000;
    let mid;
    let count;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        
        const total = getTotal(mid);
        
        if (total < M) {
            start = mid + 1;
        } else {
            end = mid - 1; 
            count = mid;
        }
    }
    
    return count;
}

console.log(binarySearch());
