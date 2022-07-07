const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", function (line) {
  input.push(line.split(" ").map((el) => +el));
}).on("close", function () {
  solution();
  process.exit();
});

function solution() {
  let [N, M] = input[0];
  let answer = [];
  let parent = Array(N + 1)
    .fill(0)
    .map((el, i) => el + i);

  const findParent = (arr, t) => {
    if (arr[t] !== t) arr[t] = findParent(arr, arr[t]);
    return arr[t];
  };

  const unionFind = (arr, a, b) => {
    a = findParent(arr, a);
    b = findParent(arr, b);
    if (a < b) arr[b] = a;
    else arr[a] = b;
    return arr;
  };

  for (let index = 1; index < input.length; index++) {
    let [calc, i, j] = input[index];
    if (calc === 0) parent = unionFind(parent, i, j);
    else if (calc === 1)
      answer.push(
        findParent(parent, i) === findParent(parent, j) ? "YES" : "NO"
      );
  }
  console.log(answer.join("\n"));
}
