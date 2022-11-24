const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const dict = {};

input.forEach(el => {
    const line = el.split("");
    line.forEach(el2 => {
        if (el2 !== " ") {
            if (dict[el2] === undefined) {
               dict[el2] = 1
            } else {
               dict[el2]++
            }
        }
    })
})
const max = Math.max(...Object.values(dict));
console.log(Object.keys(dict).filter(el => dict[el] === max).sort().join(""));
