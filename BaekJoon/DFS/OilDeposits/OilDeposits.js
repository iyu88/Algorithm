const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
const answer = [];
const DY = [-1, -1, -1, 0, 1, 1, 1, 0];
const DX = [-1, 0, 1, 1, 1, 0, -1, -1];

while (index < inputs.length - 1) {
    const [N, M] = inputs[index++].split(' ').map(Number);
    const A = inputs.slice(index, index + N).map(el => el.split(''));
    const visited = Array.from({length: N}, () => Array.from({length: M}, () => false));
    let count = 0;
    index += N;
    
    const dfs = (y, x) => {
        for (let k = 0 ; k < 8 ; k++) {
            const dyy = y + DY[k];
            const dxx = x + DX[k];
            
            if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= M) continue;
            if (visited[dyy][dxx]) continue; 
            
            if (A[dyy][dxx] === '@') {
                visited[dyy][dxx] = true;
                dfs(dyy, dxx);
            }
            
        }
    }
    
    for (let i = 0 ; i < N ; i++) {
        for (let j = 0 ; j < M ; j++) {
            if (A[i][j] === '@' && visited[i][j] === false) {
                visited[i][j] = true;
                dfs(i, j);
                count++;
            }
        }
    }
    
    answer.push(count);
}

console.log(answer.join('\n'));
