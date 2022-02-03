const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num;
let $map = arr.map(el => el.split('').map(el2 => +el2));
let answer = [];

const check = (xfrom, xto, yfrom, yto) => {
    let count = 0;
    for (let i = xfrom; i < xto; i++) {
        for (let j = yfrom; j < yto; j++) {
            if ($map[i][j]) count++;
        }
    }
    
    if (!count) {
        answer.push(0); 
    } else if (count === Math.pow((xto - xfrom), 2)) {
        answer.push(1);
    } else {
    	answer.push('(');
        check(xfrom, Math.floor((xfrom + xto) / 2), yfrom, Math.floor((yfrom + yto) / 2));
        check(xfrom, Math.floor((xfrom + xto) / 2), Math.floor((yfrom + yto) / 2), yto);
        check(Math.floor((xfrom + xto) / 2), xto, yfrom, Math.floor((yfrom + yto) / 2));
        check(Math.floor((xfrom + xto) / 2), xto, Math.floor((yfrom + yto) / 2), yto);
    	answer.push(')');
    }
}

check(0, N, 0, N);
if (answer.length === 1) {
    console.log(answer[0]);  
} else if (answer[0] !== '(') {
	console.log("(" + answer.join('') + ")");
} else {
	console.log(answer.join(''));
}
