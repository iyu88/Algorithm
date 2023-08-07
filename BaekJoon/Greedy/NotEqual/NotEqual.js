const fs = require("fs");
const N = +fs.readFileSync("/dev/stdin").toString().trim();

const visited = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => false)
);
const answer = [];
let currentPoint = 1;

const gatherAllTerm = () => {
  for (let i = 1; i <= Math.floor((N * (N - 1)) / 2); i++) {
    for (let j = 1; j <= N; j++) {
      if (j === currentPoint || visited[currentPoint][j]) continue;
      visited[currentPoint][j] = visited[j][currentPoint] = true;
      currentPoint = j;
      answer.push(currentPoint);
      break;
    }
  }
};

visited[1][N] = visited[N][1] = true;
answer.push(1);
gatherAllTerm();

console.log([...answer, 1].map((el) => "a" + el).join(" "));
