const fs = require('fs');
let str = fs.readFileSync('/dev/stdin').toString().trim();

let arr1 = str.split('').map(el => Number(el) === +el ? el : " ").join('').split(' ').map(el2 => +el2);
let arr2 = str.split('').filter(el => Number(el) !== +el);
let temp = [];
let isOpen = false;

for (let i = 0; i < arr1.length; i++) {
    temp.push(arr1[i]);
    if (arr2[i] === '-') {
        if (!isOpen) {
            temp.push(arr2[i]);
            temp.push('(');
            isOpen = true;
        } else {
            temp.push(')');
            temp.push(arr2[i]);
            temp.push('(');
        }
    } else if (arr2[i] === '+') {
        temp.push(arr2[i]);
    } else {
        isOpen ? temp.push(")") : "";
    }
}

console.log(eval(temp.join('')));
