const fs = require('fs');
const [_, points, ...lines] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const searchMin = (arr, target) => {
    let start = 0;
    let end = arr.length - 1; 
    let mid;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        
        if (arr[mid] < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    
    return end + 1;
}

const searchMax = (arr, target) => {
    let start = 0;
    let end = arr.length - 1;
    let mid;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        
        if (target < arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    
    return end;
}

const arr = points.split(' ').map(Number).sort((a, b) => a - b);

const answer = lines.map(el => {
    const [from, to] = el.split(' ').map(Number);
    const min = searchMin(arr, from);
    const max = searchMax(arr, to);
    return max - min + 1; 
});

console.log(answer.join('\n'));
