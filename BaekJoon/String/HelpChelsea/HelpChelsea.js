const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let index = 0;
let answer = [];

while (index < arr.length) {
  let next = +arr[index++];
  let $case = arr
    .slice(index, index + next)
    .map((el) => el.split(" "))
    .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
  let max = Math.max(...Object.keys($case));
  answer.push($case[max]);
  index += next;
}

console.log(answer.join("\n"));
