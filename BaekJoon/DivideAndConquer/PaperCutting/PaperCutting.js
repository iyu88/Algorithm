const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num; 
let $map = arr.map(el => el.split(' ').map(el2 => +el2));
let white = 0;
let blue = 0;

const check = (xfrom, xto, yfrom, yto) => {
    let count = 0;
    for(let i = yfrom; i < yto; i++) {
        for(let j = xfrom; j < xto; j++) {
            if ($map[i][j]) count++;
        }
    }
    if (!count) {
        white++;
    } else if (count === Math.pow((xto - xfrom), 2)) {
        blue++;
    } else {
        check(xfrom, Math.floor((xfrom + xto)) / 2, yfrom, Math.floor((yfrom + yto) / 2));
        check(Math.floor((xfrom + xto)) / 2, xto, yfrom, Math.floor((yfrom + yto) / 2));
        check(xfrom, Math.floor((xfrom + xto)) / 2, Math.floor((yfrom + yto) / 2), yto);
        check(Math.floor((xfrom + xto)) / 2, xto, Math.floor((yfrom + yto) / 2), yto);
    }
}

check(0, N, 0, N);
console.log(white);
console.log(blue);
