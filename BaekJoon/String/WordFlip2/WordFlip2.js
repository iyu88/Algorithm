const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("");

const S = [];
let answer = [];
let index = 0;

const throwOut = () => {
  while (S.length) {
    let $char = S.pop();
    answer.push($char);
  }
};

while (index < arr.length) {
  if (arr[index] === "<") {
    throwOut();
    let endIndex = arr.indexOf(">", index);
    for (let i = index; i <= endIndex; i++) {
      answer.push(arr[i]);
    }
    index = endIndex;
  } else if (arr[index] === " ") {
    throwOut();
    answer.push(" ");
  } else S.push(arr[index]);
  index++;
}

throwOut();

console.log(answer.join(""));
