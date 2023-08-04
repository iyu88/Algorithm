const fs = require("fs");
let word = fs.readFileSync("/dev/stdin").toString().trim();
const counts = {
  w: 0,
  o: 0,
  l: 0,
  f: 0,
};

const countWOLF = (word) => {
  for (let i = 0; i < word.length; i++) {
    counts[word[i]]++;
  }

  const [value] = Object.values(counts);

  return Object.values(counts).every((el) => el === value) ? 1 : 0;
};

const result = countWOLF(word);

const makeDummyWOLF = (repeatTime) => {
  return Object.keys(counts)
    .map((el) => el.repeat(repeatTime))
    .join("");
};

const solution = () => {
  if (result === 0) {
    return 0;
  } else {
    let count = +counts["w"];
    if (word === makeDummyWOLF(count)) {
      return 1;
    } else {
      for (let i = 1; i < count; i++) {
        const dummyWOLF = makeDummyWOLF(count - i);
        while (word.indexOf(dummyWOLF) !== -1) {
          const length = dummyWOLF.length;
          const replacer = "*".repeat(length);
          word = word.replace(dummyWOLF, replacer);
        }
      }

      for (let i = 0; i < word.length; i++) {
        if (word[i] !== "*") {
          return 0;
        }
      }

      return 1;
    }
  }
};

console.log(solution());
