const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];

while (arr.length !== 1) {
  let [K, ...S] = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  const visited = Array(6).fill(false);
  let temp = [];

  const backTracking = (i = 0, next = 0) => {
    if (visited.every((el) => el !== false))
      temp.push(visited.slice(0).join(" "));
    else {
      for (let j = next; j < S.length; j++) {
        if (visited[i]) continue;
        visited[i] = S[j];
        let isDiff = true;
        for (let k = 0; k < i; k++) {
          if (visited[k] === S[j]) {
            isDiff = false;
            break;
          }
        }
        if (isDiff) backTracking(i + 1, j + 1);
        visited[i] = false;
      }
    }
  };

  backTracking();

  answer.push(temp.join("\n"));
}

console.log(answer.join("\n\n"));
