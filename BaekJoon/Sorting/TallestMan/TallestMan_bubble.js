const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bubbleSort = arr => {
    for (let i = 0; i < arr.length; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] < arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    
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
    
    const [ max ] = bubbleSort(arr);
    
    answer.push(Object.keys(dict).filter(key => +dict[key] === max).join(' '));
    
    index += count;
}

console.log(answer.join('\n'));
