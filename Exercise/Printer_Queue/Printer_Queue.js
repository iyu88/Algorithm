const fs = require('fs');
let [size, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let S = +size;

while (arr.length !== 0) {
    let temp = arr.shift();
    let [a, b] = temp.split(' ').map(el => +el);
    let temp2 = arr.shift();
    let newArr = temp2.split(' ').map(el => +el);
    let index = Array(newArr.length).fill(0).map((el, i) => el + i);
    let answer = 0;
    while (index.includes(b)) {
        if (newArr.some(el => el > newArr[0])) {
            let $a = newArr.shift();
            let $b = index.shift();
            newArr.push($a);
            index.push($b);
        } else {
            newArr.shift();
            index.shift();
            answer++;
        }
    }
    console.log(answer);
}
