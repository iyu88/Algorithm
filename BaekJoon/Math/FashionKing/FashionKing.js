const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer = [];

while (arr.length) {
  let M = Number(arr.shift());
  let obj = {};
  if (M) {
    arr.splice(0, M).map((el) => {
      let [name, category] = el.split(" ");
      if (obj[category] === undefined) obj[category] = [name];
      else obj[category].push(name);
    });
    let len = Object.values(obj).map((el) => el.length + 1);
    let mul = len[0];
    for (let i = 1; i < len.length; i++) {
      mul *= len[i];
    }
    answer.push(mul - 1);
  } else {
    answer.push(0);
  }
}

console.log(answer.join("\n"));
