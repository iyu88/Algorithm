const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const mirror = arr.splice(0, N).map(el => el.split(''));
const [ M ] = arr;

if (M === '1') {
    console.log(mirror.map(el => el.join('')).join('\n'));
} 
if (M === '2') {
    console.log(mirror.map(el => el.reverse().join('')).join('\n'));
}
if (M === '3') {
    console.log(mirror.map(el => el.join('')).reverse().join('\n'));
}
