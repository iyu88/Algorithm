const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [S, C] = nums.split(' ').map(Number);
const arr = inputs.map(Number);

const check = value => {
    let count = 0;
    
    for (let i = 0 ; i < arr.length; i++) {
        count += Number((BigInt(arr[i]) / value).toString());
    }
    
    return count >= C;
}

const binarySearch = () => {
    let length = BigInt(0);
    let start = BigInt(1);
    let end = BigInt(1000000000);
    let mid;
    
    while (start <= end) {
        mid = BigInt(Number((start + end) / BigInt(2)));
        
        if (check(mid)) {
            start = mid + BigInt(1);
            length = mid;
        } else {
            end = mid - BigInt(1);
        }
    }
    
    return length;
}

const calculatedLegnth = binarySearch();
const totalLength = BigInt(arr.reduce((acc, cur) => acc + cur, 0));

console.log((totalLength - calculatedLegnth * BigInt(C)).toString());
