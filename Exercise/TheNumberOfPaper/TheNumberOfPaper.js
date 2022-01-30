const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num;
let $map = arr.map(el => el.split(' ').map(el2 => +el2));
let answer = [0, 0, 0];

const check = (xfrom, xto, yfrom, yto) => {
    let count = [0, 0, 0]; // -1, 0, 1
    let total = Math.pow((xto-xfrom), 2);
    let step = Math.floor((xto - xfrom) / 3);
    for (let i = xfrom; i < xto; i++) {
        for (let j = yfrom; j < yto; j++) {
            if (!$map[i][j]) {
                count[1]++;
            } else if ($map[i][j] === -1) {
                count[0]++;
            } else {
                count[2]++;
            }
        }
    }
    
    if (count[0] === total) {
        answer[0]++;
    } else if (count[1] === total) {
        answer[1]++;
    } else if (count[2] === total) {
        answer[2]++;
    } else {
        check(xfrom, xfrom + step, yfrom, yfrom + step);
        check(xfrom + step, xfrom + (step * 2), yfrom, yfrom + step);
        check(xfrom + (step * 2), xto, yfrom, yfrom + step);
        
        check(xfrom, xfrom + step, yfrom + step, yfrom + (step * 2));
        check(xfrom + step, xfrom + (step * 2), yfrom + step, yfrom + (step * 2));
        check(xfrom + (step * 2), xto, yfrom + step, yfrom + (step * 2));
        
        check(xfrom, xfrom + step, yfrom + (step * 2), yto);
        check(xfrom + step, xfrom + (step * 2), yfrom + (step * 2), yto);
        check(xfrom + (step * 2), xto, yfrom + (step * 2), yto);
    }
}

check(0, N, 0, N);
console.log(answer.join('\n'));
