const fs = require('fs');
const [nums, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [_, M] = nums.split(' ').map(Number);
const video = input.split(' ').map(Number);
const sum = video.reduce((acc, cur) => acc + cur, 0);

const binarySearch = (video) => {
    let start = Math.ceil(sum / M);
    let end = sum;
    let mid;
    let copied;
    let updated;
    let count;
    let result = Infinity;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        copied = mid;
        updated = 0;
        count = 0;
        
        for (const v of video) {
            if (copied - v >= 0) copied -= v;
            else {
                count++;
                copied = mid - v;
                if (copied < 0) {
                    updated = v;
                    break;
                }
            }
        }
        
        if (updated > 0) {
            start = updated;
            continue;
        }
        
        if (copied < mid) count++;
        
        if (count <= M) {
            if (result > mid) result = mid;
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    
    return result;
}

console.log(binarySearch(video));
