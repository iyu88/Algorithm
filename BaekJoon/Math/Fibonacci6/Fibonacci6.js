const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString();

let unit = [
  [1, 0],
  [0, 1],
]; // 단위 행렬
let fibo = [
  [1, 1],
  [1, 0],
]; // 피보나치 행렬
let mod = BigInt(1000000007);

const mat_mul = (mat1, mat2) => {
  let temp = Array(2)
    .fill(null)
    .map((el) => Array(2).fill(BigInt(0)));
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        temp[i][j] += BigInt(mat1[i][k]) * BigInt(mat2[k][j]);
      }
      temp[i][j] %= mod;
    }
  }
  return temp;
};

while (BigInt(N) > BigInt(0)) {
  // N이 0보다 클 때
  if (BigInt(N) % BigInt(2) === BigInt(1)) {
    // N이 홀수일 경우
    unit = mat_mul(unit, fibo); // 단위 행렬과 피보나치 행렬을 곱함
  }
  fibo = mat_mul(fibo, fibo); // 피보나치 행렬을 제곱
  N = BigInt(N) / BigInt(2); // N을 반으로 줄임
}

console.log(unit[0][1].toString()); // 단위 행렬의 0, 1 값을 출력
