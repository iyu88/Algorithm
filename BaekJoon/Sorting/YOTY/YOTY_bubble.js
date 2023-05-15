const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
let index = 0;

const bubbleSort = (arr) => {
    for (let i = 0 ; i < arr.length ; i++) {
        let swapped = false;
        for (let j = 0 ; j < arr.length - i - 1 ; j++) {
            if (arr[j] < arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swapped = true;
            }
        }
        if (swapped === false) break;
    }
    
    return arr;
}

while (index < inputs.length) {
    const count = +inputs[index++];
    const dict = {};
    inputs.slice(index, index + count).forEach(el => {
        const [colleague, drinks] = el.split(' ');
        dict[drinks] = colleague;
    });
    index += count;
    
    const [ max ] = bubbleSort(Object.keys(dict).map(Number));
    
    answer.push(dict[max]);
}

console.log(answer.join('\n'));
