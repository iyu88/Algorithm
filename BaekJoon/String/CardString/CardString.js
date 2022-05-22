const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

while (arr.length) {
  let $case = arr.splice(0, 2);
  let $str = $case[1].split(" ");
  let result = $str[0];
  for (let i = 1; i < $str.length; i++) {
    result = [result + $str[i], $str[i] + result].sort()[0];
  }
  console.log(result);
}
