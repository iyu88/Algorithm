const fs = require("fs");
let [num, arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = +num;
arr = arr
  .split(" ")
  .map(BigInt)
  .sort((a, b) => {
    if (a > b) return 1;
    else if (a === b) return 0;
    else if (a < b) return -1;
  });

const isPrime = (num) => {
  if (num < 2) return false;
  else {
    for (let k = 2; k <= Math.sqrt(Number(num).toString()); k++) {
      if (num % BigInt(k) === BigInt(0)) return false;
    }
    return true;
  }
};

const gcd = (b, s) => {
  return s === BigInt(0) ? b : gcd(s, b % s);
};

const lcm = (b, s, gcd) => {
  return (b * s) / gcd(b, s);
};

arr = arr.filter((el) => isPrime(el));
if (arr.length === 0) {
  console.log(-1);
} else {
  if (arr.length === 1) console.log(arr[0]);
  else if (arr.length === 2) {
    console.log(lcm(arr[1], arr[0], gcd).toString());
  } else {
    let temp = lcm(arr[1], arr[0], gcd);
    console.log(
      arr
        .slice(1)
        .reduce((acc, cur) => {
          let sorted = [acc, cur].sort((a, b) => {
            if (a > b) return 1;
            else if (a === b) return 0;
            else if (a < b) return -1;
          });
          return lcm(sorted[1], sorted[0], gcd);
        }, temp)
        .toString()
    );
  }
}
