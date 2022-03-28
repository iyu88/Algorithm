let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let obj = {};

input.forEach((el) => {
  let first = el.charAt(0);
  if (obj[first]) {
    obj[first]++;
  } else {
    obj[first] = 1;
  }
});

let answer = Object.keys(obj)
  .filter((el) => obj[el] > 4)
  .sort((a, b) => obj[b] - obj[a]);

if (answer.length === 0) {
  console.log("PREDAJA");
} else {
  console.log(answer.sort().join(""));
}
