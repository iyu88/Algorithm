const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').slice(0, -1);

const dict = {'b': 'd', 'd': 'b', 'p': 'q', 'q': 'p', 'i': undefined, 'o': undefined, 'v': undefined, 'w': undefined, 'x': undefined};

console.log(arr.map(el => {
    const line = el.split('');
    if (!line.every(el2 => Object.keys(dict).includes(el2))) {
        return 'INVALID';
    } else {
        return line.map(el2 => dict[el2] === undefined ? el2 : dict[el2]).reverse().join('');
    }
}).join('\n'));
