const fs = require('fs');
let [N, r, c] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(el => +el);

let answer = 0;
const dNc = (N, r, c) => {
    let next = 2**(N-1);
	if (r < next && c >= next) { // 2사분면
    	answer += 2 ** (2*(N-1));
    } else if (r >= next && c < next) { // 3사분면
    	answer += (2 ** (2*(N-1))) * 2;
    } else if (r >= next && c >= next) { // 4사분면
    	answer += (2 ** (2*(N-1))) * 3;
    }
    if (N !== 1) {
    	dNc(N-1, r < next ? r : r - next, c < next ? c : c - next); // 1사분면
    }
}

dNc(N,r,c);
console.log(answer);
