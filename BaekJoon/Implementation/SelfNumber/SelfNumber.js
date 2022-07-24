let answer = [];

const solution = (num) => {
  let $number = num;
  let result = 0;

  for (let i = 0; i < String(num).length; i++) {
    result += $number % 10;
    $number = Math.floor($number / 10);
  }

  return num + result;
};

const end = 10000;
let self = Array(end + 1).fill(true);

for (let i = 0; i <= end; i++) {
  self[solution(i)] = false;
}

for (let i = 0; i < end; i++) {
  if (self[i]) answer.push(i);
}

console.log(answer.join("\n"));
