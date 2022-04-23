const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
let N = +num;
let len = arr.length;
for (let i = 0; i < len; i += 3) {
  let [command, $len, temp] = arr.slice(i, i + 3);
  let where = true;
  temp = temp.slice(1, temp.length - 1).split(",");
  command = command.split("");
  let front = 0;
  let rear = temp.length;
  for (let j = 0; j < command.length; j++) {
    if (command[j] === "R") where = !where;
    else {
      where ? front++ : rear--;
      if (front > rear || temp[0] === "") {
        answer.push("error");
        break;
      }
    }
  }
  if (answer.length <= Math.floor(i / 3))
    answer.push(
      `[${
        where
          ? temp.slice(front, rear).join(",")
          : temp.slice(front, rear).reverse().join(",")
      }]`
    );
}

console.log(answer.join("\n"));
