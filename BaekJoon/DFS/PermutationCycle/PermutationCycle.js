const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

while(arr.length) {
    let N = Number(arr.shift());
    let answer = 0;
    let temp1 = Array(N).fill(1);
    let temp2 = arr.shift().split(' ').map(el => +el);
    
    const dfs = (el, index) => {
        if (temp1[el-1]) {
            temp1[el-1]--;
            let j = temp2.indexOf(index+1);
            dfs(temp2[j], j);
        }
        return;
    }
    
    for (let i = 0 ; i < N ; i++) {
        if (temp1[temp2[i]-1]) {
            dfs(temp2[i], i);
            answer++;
        }
    }
    console.log(answer);
}
