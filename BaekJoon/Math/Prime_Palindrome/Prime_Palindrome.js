const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString() * 1;

const isPrime = (num) => {
  if (num < 2) return false;
  else {
    let end = Math.sqrt(num);
    for (let i = 2; i <= end; i++) {
      if (!(num % i)) return false;
    }
  }
  return true;
};

const isPalindrome = (num) => {
  let temp = num.toString().split("");
  let len = Math.floor(temp.length / 2);
  for (let i = 0; i < len; i++) {
    if (temp[i] !== temp[temp.length - 1 - i]) return false;
  }
  return true;
};

for (let i = N; i < Infinity; i++) {
  if (isPrime(i) && isPalindrome(i)) {
    console.log(i);
    break;
  }
}
