const fs = require('fs');
let arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

let answer = [];
let index = 0;

while (arr[index][0] !== 0) {
    let [N, M] = arr[index++];
    let $case = arr.slice(index, index + M).sort((a, b) => a[2] - b[2]);
    let total = $case.reduce((acc, cur) => acc + cur[2], 0);
    index += M;
    let parent= {};
    let sum = 0;
    
    for (let i = 0 ; i < N ; i++) {
        parent[i] = i; 
    }
    
    const findParent = (obj, t) => {
        if (obj[t] !== t) obj[t] = findParent(obj, obj[t]);
        return obj[t];
    }
    
    const unionFind = (obj, a, b) => {
        if (a < b) obj[b] = a;
        else obj[a] = b;
    }
    
    for (let i = 0; i < M; i++) {
        let [from, to, weight] = $case[i];
        let fromParent = findParent(parent, from);
        let toParent = findParent(parent, to);
        if (fromParent !== toParent) {
            unionFind(parent, fromParent, toParent);
            sum += weight;
        }
    }
    
    answer.push(total - sum);
}

console.log(answer.join('\n'));