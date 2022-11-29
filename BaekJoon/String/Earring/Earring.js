const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').slice(0, -1);

const answer = [];
let index = 0;

while (index < arr.length) {
    const N = +arr[index++];
    const names = arr.slice(index, index + N)
    const obj = names.reduce((acc, _, index) => ({...acc, [index + 1]: 0}), {});
    index += N;
    arr.slice(index, index + (2 * N - 1)).forEach(el => {
        const [num, char] = el.split(' ');
        obj[num]++; 
    });
    index += 2 * N - 1
    answer.push(`${answer.length + 1} ${names[Object.keys(obj).filter(key => obj[key] === 1)[0]-1]}`);
}

console.log(answer.join('\n'));
