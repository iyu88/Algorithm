const fs = require("fs");
const [_, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const NAMES = [
  "Bessie",
  "Buttercup",
  "Belinda",
  "Beatrice",
  "Bella",
  "Blue",
  "Betsy",
  "Sue",
];
const sorted = NAMES.sort((a, b) => a.localeCompare(b));

const getSubsets = (arr, t) => {
  const subset = [];
  for (let i = 0; i < arr.length; i++) {
    if (t === 1) {
      subset.push([arr[i]]);
    } else {
      const result = getSubsets(
        [...arr.slice(0, i), ...arr.slice(i + 1)],
        t - 1
      );
      result.forEach((el) => subset.push([arr[i], ...el]));
    }
  }

  return subset;
};

const condition = inputs.map((el) => {
  const sentence = el.split(" ");
  return [sentence[0], sentence[5]];
});

const subsets = [...new Set(getSubsets(sorted, 8))];

for (let i = 0; i < subsets.length; i++) {
  const arr = subsets[i];

  let satisfied = 0;
  for (let j = 0; j < condition.length; j++) {
    const [X, Y] = condition[j];
    const indexX = arr.indexOf(X);
    const indexY = arr.indexOf(Y);

    if (Math.abs(indexX - indexY) === 1) satisfied++;
  }

  if (satisfied === condition.length) {
    console.log(arr.join("\n"));
    break;
  }
}
