const fs = require('fs');
const [nums, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const [N, K] = nums;

const selection_sort = (arr) => {
    const result = arr.slice(0);
    const len = result.length;
    let answer;
    let count = 0;
    for (let i = len - 1 ; i > 0 ; i--) {
        let max = 0;
        let index;
        for (let j = 0 ; j <= i ; j++) {
            if (max < result[j]) {
                max = result[j];
                index = j;
            }
        }
        if (i !== index) {
            [result[i], result[index]] = [result[index], result[i]];
            if (++count === K) answer = [result[index], result[i]];
        }
    }
    return [result, answer, count];
}

const [result, answer, count] = selection_sort(arr);

console.log(count < K ? -1 : answer.join(' '));
