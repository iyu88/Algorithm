const fs = require("fs");
const [num, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = +num;
let answer = 0;

for (let i = 0; i < N - 1; i++) {
  for (let j = i + 1; j < N; j++) {
    const [A, B] = [inputs[i], inputs[j]];

    let isSimilar = true;

    const visitedA = Array(26).fill(0);
    const visitedB = Array(26).fill(0);

    for (let k = 0; k < A.length; k++) {
      const indexA = A[k].charCodeAt(0) - 97;
      const indexB = B[k].charCodeAt(0) - 97;

      if (visitedA[indexA] === 0 && visitedB[indexB] === 0) {
        visitedA[indexA] = B[k];
        visitedB[indexB] = A[k];
      } else if (visitedA[indexA] !== B[k]) {
        isSimilar = false;
        break;
      }
    }

    if (isSimilar) answer++;
  }
}

console.log(answer);
