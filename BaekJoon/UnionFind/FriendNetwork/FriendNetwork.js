const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let index = 0;
let answer = [];

while (index < arr.length) {
  let M = Number(arr[index]);
  let $case = arr.slice(index + 1, index + M + 1);
  index += M + 1;

  let dict = {};
  let times = {};

  const findParent = (arr, t) => {
    if (arr[t] !== t) arr[t] = findParent(arr, arr[t]);
    return arr[t];
  };

  const unionFind = (arr, a, b) => {
    a = findParent(arr, a);
    b = findParent(arr, b);
    if (a < b) {
      arr[b] = a;
      times[a] += times[b];
    } else if (b < a) {
      arr[a] = b;
      times[b] += times[a];
    }
  };

  for (let i = 0; i < $case.length; i++) {
    let [a, b] = $case[i].split(" ");
    if (dict[a] === undefined) {
      dict[a] = a;
      times[a] = 1;
    }
    if (dict[b] === undefined) {
      dict[b] = b;
      times[b] = 1;
    }
    if (findParent(dict, a) !== findParent(dict, b)) unionFind(dict, a, b);
    answer.push(times[findParent(dict, a)]);
  }
}

console.log(answer.join("\n"));
