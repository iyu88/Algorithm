const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let index = 0;
let answer = [];

while (index <= arr.length) {
  let N = Number(arr[index++]);
  if (!N) break;
  let dict = {};
  let key = arr
    .slice(index, index + N)
    .map((el) => {
      dict[el.toLowerCase()] = el;
      return el.toLowerCase();
    })
    .sort()[0];
  answer.push(dict[key]);
  index += N;
}

console.log(answer.join("\n"));
