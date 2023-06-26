const fs = require('fs');
let [A, B] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split('').map(Number));

if (A.length < B.length) {
    [A, B] = [B, A];
}

let answer = A.length + B.length;

for (let i = 0 ; i < A.length ; i++) {
    let count = 0;
    let t = 0;
    for (let j = 0 ; j < B.length ; j++) {
        if (A[i + j] === undefined) break;
        if (A[i + j] === 2 && B[j] === 2) {
            t = 1;
            break;
        } else {
            count++;
        }
    }
    
    if (count === B.length) {
        answer = Math.min(answer, A.length);
        break; 
    }
    
    if (t === 0) {
        answer = Math.min(answer, A.length + B.length - count);
    }
}

for (let i = 0 ; i < B.length ; i++) {
    let count = 0;
    let t = 0;
    for (let j = 0 ; j < A.length ; j++) {
        if (B[i + j] === undefined) break;
        if (B[i + j] === 2 && A[j] === 2) {
            t = 1;
            break;
        } else {
            count++;
        }
    }
    
    if (count === B.length) {
        answer = Math.min(answer, A.length);
        break;
    }
    
    if (t === 0) {
        answer = Math.min(answer, A.length + B.length - count);
    }
}

console.log(answer === A.length + B.length ? A.length + B.length : answer);
