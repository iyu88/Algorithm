const fs = require('fs');
let [size, step] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(el => +el);

let answer = [];
let index = step - 1;
let arr = Array(size).fill(1).map((el, i) => el + i);
while (arr.length) {
    step > arr.length ? index = step % arr.length - 1 : index = index;
    index < 0 ? index = arr.length - 1 : index = index;
    answer.push(arr[index]);
    arr = [...arr.slice(index + 1), ...arr.slice(0, index)];
}
console.log("<" + answer.join(', ') + ">");
