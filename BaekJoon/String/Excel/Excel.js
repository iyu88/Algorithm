const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').slice(0, -1);

console.log(arr.map(el => {
const splitR = el.split('R');
const splitC = splitR[1].split('C');
const R = splitC[0];
let C = splitC[1];
const alphabets = [];
while (--C >= 0) {
alphabets.push(String.fromCharCode((C % 26) + 65));
C /= 26;
}
return alphabets.reverse().join('').concat(R);
}).join('\n')
)
