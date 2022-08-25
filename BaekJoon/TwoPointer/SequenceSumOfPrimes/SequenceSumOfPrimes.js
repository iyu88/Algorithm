const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString() * 1;

const isPrime = (num) => {
  if (num < 2) return false;
  else {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
  }
  return true;
};

let primes = [];
for (let i = 1; i <= N; i++) {
  if (isPrime(i)) primes.push(i);
}

let answer = 0;
let start = 0;
let end = 0;

while (start <= end && end <= primes.length) {
  let sum = primes.slice(start, end).reduce((acc, cur) => acc + cur, 0);
  if (sum < N) end++;
  else {
    if (sum === N) answer++;
    start++;
  }
}

console.log(answer);
