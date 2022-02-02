const fs = require('fs');
let [nums, temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [n, m] = nums.split(' ').map(el => +el);
let $arr = temp.split(' ').map(el => +el).sort((a, b) => a - b);

const getSubs = (count, arr) => {
    let answer = [];
    for (let i = 0 ; i < arr.length; i++) {
        if (count === 1) {
            answer.push([arr[i]]);
        } else {
            let result = getSubs(count-1, [...arr.slice(i)]);
            result.forEach(el => answer.push([arr[i], ...el]));
        }
    }
    return answer;
}

console.log([...new Set(getSubs(m, $arr).map(el2 => el2.join(' ')))].join('\n'));
