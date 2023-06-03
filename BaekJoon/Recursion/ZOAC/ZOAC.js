const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim().split('').map(el => el.charCodeAt(0));

const answer = [];
const visited = Array(str.length).fill(false);

const getSubStr = (from, to) => {
    let min = Infinity;
    let index = -1;
    let temp = '';
    
    for (let i = from; i < to + 1; i++) {
        if (visited[i] === false && min > str[i]) {
            min = str[i];
            index = i;
        }
    }
    
    if (min === Infinity) return; 
    
    visited[index] = true;
    
    for (let i = 0; i < str.length; i++) {
        if (visited[i]) temp += String.fromCharCode(str[i]);
    }
    
    answer.push(temp);
    
    getSubStr(index + 1, to);
    getSubStr(from, index - 1);
}

getSubStr(0, str.length - 1);

console.log(answer.join('\n'));