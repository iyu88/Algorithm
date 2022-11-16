const fs = require('fs');
let arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').slice(0, -1);

const dict = ['a', 'e', 'i', 'o', 'u'];
console.log(arr.map(el => {
    el = el.split('');
    let vowel = el.findIndex(el2 => dict.includes(el2));
    if (vowel === -1) return el.join('') + 'ay';
    return el.slice(vowel).join('') + el.slice(0, vowel).join('') + "ay";
}).join('\n'));
