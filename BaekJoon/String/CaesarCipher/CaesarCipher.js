const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim().split('');

console.log(str.map(el => {
    const num = el.charCodeAt(0) - 3;
    if (num < 65) {
        return String.fromCharCode(num + 26);
    }
    return String.fromCharCode(num);
}).join(''));
