const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const divide = (arr, left, right) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    
    while (left <= right) {
        while (arr[left] > pivot) left++;
        while (arr[right] < pivot) right--;
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

const answer = [];
let index = 0;

while (index < inputs.length - 1) {
    const count = +inputs[index++];
    const dict = {};
    const heights = {};
    const info = inputs.slice(index, index + count)
                          .forEach(i => {
                              const [name, height] = i.split(' ');
                              dict[name] = height;
                              if (heights[height] === undefined) heights[height] = true;
                          });
    const arr = Object.keys(heights).map(Number);
    
    const [ max ] = quickSort(arr);
    
    answer.push(Object.keys(dict).filter(key => +dict[key] === max).join(' '));
    
    index += count;
}

console.log(answer.join('\n'));
