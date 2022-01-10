const fs = require('fs');
let word = fs.readFileSync('/dev/stdin').toString().trim().toUpperCase().split('');
let obj = {};
word.forEach(el => {
    if (obj[el]) {
        obj[el]++;
    } else {
        obj[el] = 1;
    }
});
let sorted = Object.keys(obj).sort((a,b) => obj[b] - obj[a]);
if (obj[sorted[0]] === obj[sorted[1]]) {
    console.log("?");
} else {
    console.log(sorted[0]);
}
