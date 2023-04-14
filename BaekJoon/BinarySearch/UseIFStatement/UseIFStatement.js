const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = nums.split(' ').map(Number);
let index = 0;
const titles = inputs.slice(index, index + N);
index += N;
const users = inputs.slice(index);

const values = [];
const names = [];

titles.forEach(title => {
    const [name, value] = title.split(' ');
    if (names.includes[name]) return;
    values.push(value);
    names.push(name);
});

const binarySearch = (target, arr) => {
    let start = 0;
    let end = arr.length - 1;
    let mid;
    
    while (start <= end) {
        mid = Math.floor((start + end) / 2);
        
        if (target > arr[mid]) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    
    return end;
}

const answer = users.map(user => {
    const result = binarySearch(+user, values);
    return names[result + 1];
});

console.log(answer.join('\n'));
