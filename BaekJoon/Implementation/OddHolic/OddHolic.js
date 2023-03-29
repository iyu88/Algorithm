const fs = require('fs');
const num = fs.readFileSync('/dev/stdin').toString().trim();

let [min, max] = [Infinity, 0];

const getOddCounts = (str) => str.split('').filter(el => el % 2 !== 0).length;

const splitNumber = (target, count) => {
    const len = target.length;
    const oddCount = count + getOddCounts(target);
    
    if (len === 1) {
        min = Math.min(min, oddCount);
        max = Math.max(max, oddCount);
        return;
    }
    if (len === 2) {
        const sum = Number(target[0]) + Number(target[1]);
        splitNumber(sum.toString(), oddCount);
    }
    if (len > 2) {
        for (let i = 1 ; i < len-1 ; i++) {
            for (let j = i+1 ; j < len ; j++) {
                const a = +target.substring(0, i);
                const b = +target.substring(i, j);
                const c = +target.substring(j);
                
                const next = (a+b+c).toString();
                
                splitNumber(next, oddCount);
            }
        }
    }
}

splitNumber(num, 0);
console.log([min, max].join(' '));
