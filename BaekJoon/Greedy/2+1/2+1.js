const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  let [num, ...arr] = input.map(Number);

  let N = +num;
  let answer = 0;
  arr.sort((a, b) => b - a);

  for (let i = 0; i < N; i++) {
    if ((i + 1) % 3 === 0) continue;
    answer += arr[i];
  }

  console.log(answer);
  process.exit();
});
