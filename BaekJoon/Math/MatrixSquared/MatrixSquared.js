const fs = require("fs");
let [nums, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map((el) => +el);
let mat = arr.map((el) =>
  el.split(" ").map((el2) => BigInt(+el2) % BigInt(1000))
);

const mat_mul = (mat1, mat2) => {
  let temp = Array.from(Array(N), () => Array(N));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let value = BigInt(0);
      for (let k = 0; k < N; k++) {
        value += (mat1[i][k] * mat2[k][j]) % BigInt(1000);
      }
      temp[i][j] = value % BigInt(1000);
    }
  }
  return temp;
};

const calc = (num) => {
  if (num === 1) return mat;
  let value = calc(Math.floor(num / 2));
  if (!(num % 2)) return mat_mul(value, value);
  else if (num % 2) {
    let result = mat_mul(value, value);
    return mat_mul(mat, result);
  }
};

console.log(
  calc(M)
    .map((el) => el.map((el2) => el2.toString()).join(" "))
    .join("\n")
);
