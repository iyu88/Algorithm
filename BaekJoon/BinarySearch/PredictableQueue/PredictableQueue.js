const fs = require("fs");
const [_, duration, ...tasks] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const D = duration.split(" ").map(Number);
const T = tasks.map(Number);
const S = [0];

for (let i = 1; i <= D.length; i++) {
  S.push(D[i - 1] + S[i - 1]);
}

const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;
  let mid;
  let index = -1;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (arr[mid] <= target) {
      start = mid + 1;
      index = mid;
    } else {
      end = mid - 1;
    }
  }

  return index;
};

const answer = T.map((t) => binarySearch(S, t));

console.log(answer.join("\n"));
