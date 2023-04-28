const fs = require('fs');
const [info, games, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, P] = info.split(' ').map(Number);
const [W, L, G] = games.split(' ').map(Number);
const dict = {};
const partner = inputs.splice(0, P);
partner.forEach(el => {
    const [name, result] = el.split(' ');
    dict[name] = result;
});

let score = 0;

for (const name of inputs) {
    if (dict[name] === undefined || dict[name] === 'L') {
        score -= L;
        if (score < 0) score = 0;
    } else {
        score += W;
        if (score >= G) break;
    }
}

console.log(`I AM ${score >= G ? 'NOT ' : ''}IRONMAN!!`);
