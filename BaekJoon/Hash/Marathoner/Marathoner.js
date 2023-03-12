const fs = require('fs');
const [_, ...names] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const hash = {};

names.forEach(n => {
    if (hash[n] === undefined) hash[n] = 1;
    else hash[n]++;
});

const [ answer ] = Object.keys(hash).filter(k => hash[k] % 2 !== 0);

console.log(answer);
