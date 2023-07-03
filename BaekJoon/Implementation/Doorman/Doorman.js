const fs = require('fs');
const [num, gender] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const G = gender.split('');
const counts = {
    W: 0,
    M: 0,
};

for (let i = 0 ; i < G.length ; ) {
    const g = G[i];
    
    if (g === 'W') {
        if (Math.abs((counts['W'] + 1) - counts['M']) <= N) {
            counts['W']++;
            i++;
            continue;
        }
    } else if (g === 'M') {
        if (Math.abs((counts['M'] + 1) - counts['W']) <= N) {
            counts['M']++;
            i++;
            continue;
        }
    }
    
    if (G[i] === G[i+1] || i === G.length - 1) break;
    else if (G[i] !== G[i+1]) [G[i], G[i+1]] = [G[i+1], G[i]];
}

console.log(counts['W'] + counts['M']);
