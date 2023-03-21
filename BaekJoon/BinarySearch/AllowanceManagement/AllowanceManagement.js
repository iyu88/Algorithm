const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const nums = input.shift();
const [N, M] = nums.split(' ').map(Number);
const allowance = input.map(Number);
const max = allowance.reduce((acc, cur) => acc + cur, 0);

const binarySearch = (start, end) => {
    let answer = Infinity;
    let mid;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        
        if (countWithdrawal(mid)) {
            end = mid - 1;
            answer = Math.min(answer, mid);
        } else {
            start = mid + 1;
        }
    }
    
    return answer;
}

const countWithdrawal = (mid) => {
    let balance = mid;
    let times = 1;
    
    for (let i = 0; i < N; i++) {
        if (allowance[i] > mid) return false;
        
        if (balance < allowance[i]) {
            balance = mid;
            times++;
        }
        
        balance -= allowance[i];
    }
    
    return times <= M;
}

console.log(binarySearch(1, max));
