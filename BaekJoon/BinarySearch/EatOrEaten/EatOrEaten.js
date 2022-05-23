const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
let answer;

const binarySearch = (target, arr) => {
  let start = 0;
  let end = arr.length - 1;
  let index;
  let result = 0;
  while (start <= end) {
    index = Math.floor((start + end) / 2);
    if (target <= arr[index]) {
      end = index - 1;
    } else if (target > arr[index]) {
      result = index + 1;
      start = index + 1;
    }
  }
  answer += result;
};

while (arr.length) {
  let $case = arr.splice(0, 3);
  let A = $case[1]
    .split(" ")
    .map((el) => +el)
    .sort((a, b) => a - b);
  let B = $case[2]
    .split(" ")
    .map((el) => +el)
    .sort((a, b) => a - b);
  answer = 0;
  for (let i = 0; i < A.length; i++) {
    binarySearch(A[i], B);
  }
  console.log(answer);
}
