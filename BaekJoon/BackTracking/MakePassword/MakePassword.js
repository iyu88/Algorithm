const fs = require("fs");
let [nums, chars] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];
let [L, C] = nums.split(" ").map((el) => +el);
chars = chars.split(" ").sort();
let dict = ["a", "e", "i", "o", "u"];
let visited = Array(L).fill(0);

const backTracking = (i, next, vowel, consonant) => {
  if (visited.every((el) => el !== 0)) {
    if (vowel >= 1 && consonant >= 2) answer.push(visited.slice(0).join(""));
  } else {
    for (let j = next; j < C; j++) {
      if (visited[i]) continue;
      visited[i] = chars[j];
      let isDiff = true;
      for (let k = 0; k < i; k++) {
        if (visited[k] === chars[j]) {
          isDiff = false;
          break;
        }
      }
      let isVowel = dict.includes(chars[j]);
      if (isDiff)
        backTracking(
          i + 1,
          j + 1,
          isVowel ? vowel + 1 : vowel,
          isVowel ? consonant : consonant + 1
        );
      visited[i] = 0;
    }
  }
};

backTracking(0, 0, 0, 0);

console.log(answer.join("\n"));
