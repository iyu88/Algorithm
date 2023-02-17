const fs = require('fs');
const [times, ...logs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const removeColon = (HHMM) => +HHMM.split(':').join('');
const [S, E, Q] = times.split(' ').map(removeColon);
const participants = {};

for (let i = 0; i < logs.length; i++) {
    const [time, name] = logs[i].split(' ');
    const L = removeColon(time);
    if (L <= S) {
        participants[name] = 0;
    } else if (E <= L && L <= Q) {
        if (participants[name] === 0) participants[name]++;
    } else if (L > Q) {
        break;
    }
}

console.log(Object.keys(participants).filter(name => participants[name]).length);
