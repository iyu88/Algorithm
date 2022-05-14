const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];

const getSubs = (count, arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (count === 1) result.push([arr[i]]);
    else {
      let $result = getSubs(count - 1, [...arr.slice(i + 1)]);
      $result.forEach((el) => result.push([arr[i], ...el]));
    }
  }
  return result;
};

const getGCD = (b, s) => (s === 0 ? b : getGCD(s, b % s));

while (arr.length) {
  let sum = 0;
  let [M, ...temp] = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  let subs = getSubs(2, temp);
  subs.forEach((el) => {
    let [a, b] = el;
    let max = Math.max(a, b);
    let min = Math.min(a, b);
    sum += getGCD(max, min);
  });
  answer.push(sum);
}

console.log(answer.join("\n"));
