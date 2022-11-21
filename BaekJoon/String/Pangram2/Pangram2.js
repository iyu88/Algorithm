const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').slice(0, -1);

console.log(arr.map(el => {
    const dict = {};
    el.split('').forEach(el2 => {
        if (el2 !== ' ' && dict[el2] === undefined) dict[el2] = 1;
    });
    return new Set([...Object.keys(dict)]).size  === 26 ? "Y" : "N";
}).join('\n'));
