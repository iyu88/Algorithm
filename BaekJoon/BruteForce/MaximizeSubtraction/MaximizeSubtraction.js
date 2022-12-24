const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = input.split(' ').map(Number);

const getSub = (count, arr) => {
    const result = [];
    for (let i = 0 ; i < arr.length; i++) {
        if (count === 1) result.push([arr[i]]);
        else {
            const temp = getSub(count - 1, [...arr.slice(0, i), ...arr.slice(i+1)]);
            temp.forEach(el => result.push([...el, arr[i]]));
        }
    }
    return result;
}

const answer = getSub(N, arr);

const calcSum = (arr) => arr.reduce((acc, cur, index) => index < arr.length-1 ? acc + Math.abs(cur - arr[index+1]) : acc, 0);

console.log(Math.max(...answer.map(calcSum)));
