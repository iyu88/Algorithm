const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString() * 1;

let answer = 0;
let visited = Array(N).fill(0);

const check = (x) => {
  for (let i = 0; i < x; i++) {
    if (visited[x] === visited[i]) return false;
    if (Math.abs(i - x) === Math.abs(visited[i] - visited[x])) return false;
  }
  return true;
};

const backTracking = (x) => {
  if (x === N) answer++;
  else {
    for (let i = 0; i < N; i++) {
      // 들어갈 수 있는 위치를 순회
      if (visited[x]) continue; // 현재 인덱스의 값 유무 확인
      visited[x] = i; // 현재 인덱스가 0 ~ N-1 일 때
      if (check(x)) backTracking(x + 1);
      visited[x] = 0;
    }
  }
};

backTracking(0);

console.log(answer);
