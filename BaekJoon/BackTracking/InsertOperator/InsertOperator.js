const fs = require("fs");
let [N, nums, operator] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map((el2) => +el2));

operator = operator
  .map((el, i) => {
    let str;
    if (!i) str = "+";
    if (i === 1) str = "-";
    if (i === 2) str = "*";
    if (i === 3) str = "/";
    return str.repeat(el);
  })
  .join("")
  .split("");

let visited = Array(N[0] - 1).fill(0);
let answer = Array(2).fill(undefined);

const calc = (num1, num2, oper) => {
  if (oper === "+") {
    return num1 + num2;
  } else if (oper === "-") {
    return num1 - num2;
  } else if (oper === "*") {
    return num1 * num2;
  } else if (oper === "/") {
    if (num1 < 0) {
      let result = Math.floor(Math.abs(num1) / num2);
      return result == 0 ? 0 : result * -1;
    } else {
      return Math.floor(num1 / num2);
    }
  }
};

const backTracking = (i, result) => {
  if (!visited.some((el) => el === 0)) {
    if (answer[0] === undefined && answer[1] === undefined)
      answer[0] = answer[1] = result;
    if (answer[0] < result) answer[0] = result;
    if (answer[1] > result) answer[1] = result;
  } else {
    for (let j = 0; j < N[0] - 1; j++) {
      if (visited[i]) continue;
      visited[i] = j + 1;
      let isDiff = true;
      for (let k = 0; k < i; k++) {
        if (visited[k] === j + 1) {
          isDiff = false;
          break;
        }
      }
      let c = calc(result, nums[i + 1], operator[j]);
      if (isDiff) backTracking(i + 1, c);
      visited[i] = 0;
    }
  }
};

backTracking(0, nums[0]);

console.log(answer.join("\n"));
