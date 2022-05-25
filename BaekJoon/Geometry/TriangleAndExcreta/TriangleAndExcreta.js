const fs = require('fs');
let arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

while (arr.length !== 1) {
    let sorted = arr.shift().split(' ').map(el => +el).sort((a, b) => a - b);
    if (sorted[2] < sorted[0] + sorted[1] ) {
        if (sorted[0] === sorted[1] && sorted[1] === sorted[2]) {
            console.log('Equilateral');
        } else if (sorted[0] === sorted[1] || sorted[1] === sorted[2] || sorted[2] === sorted[0]) {
            console.log('Isosceles');
        } else {
            console.log('Scalene');
        }
    } else {
        console.log('Invalid');
    }
}
