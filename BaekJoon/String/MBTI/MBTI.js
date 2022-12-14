const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim().split('');

const dict = {
    'I': 'E',
    'E': 'I',
    'S': 'N',
    'N': 'S',
    'T': 'F',
    'F': 'T',
    'J': 'P',
    'P': 'J',
}

console.log(str.map(el => dict[el]).join(''));
