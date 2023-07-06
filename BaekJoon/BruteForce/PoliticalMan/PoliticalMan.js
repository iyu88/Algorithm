const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = nums.split(' ').map(Number);
const H = Math.floor(N / 2);
const computers = inputs.map(el => el.split(' ').map(Number));

const flip = (arr) => {
    for (let i = 0 ; i < N ; i++) {
        for (let j = 0 ; j < N ; j++) {
            arr[i][j] = arr[i][j] === 1 ? 0 : 1;
        }
    }
}

const controlComputers = (arr) => {
    let flag = true;
    let count;
    
    for (let i = 0 ; i < N ; i++) {
        count = 0;
        
        for (let j = 0 ; j < N ; j++) if (arr[i][j]) count++;
        if (count > H) {
            for (let k = 0 ; k < N ; k++) arr[i][k] = 1;
        }
        
        count = 0;
        
        for (let j = 0 ; j < N ; j++) if (arr[j][i]) count++;
        if (count > H) {
            for (let k = 0 ; k < N ; k++) arr[k][i] = 1;
        }
    }
    
    for (let i = 0 ; i < N ; i++) {
        for (let j = 0 ; j < N ; j++) {
            if (arr[i][j] === 0) flag = false;
        }
    }
    
    return flag;
}

if (M === 0) flip(computers);
controlComputers(computers);
const result = controlComputers(computers);

console.log(result ? 1 : 0);
