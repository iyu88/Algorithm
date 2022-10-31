const fs = require("fs");
console.log(
  fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .slice(0, -1)
    .map((el) => {
      let vowel = Array.from("aeiou");
      let alphabet = Array.from("abcedfghijklmnopqrstuvwxyz");
      let consonant = alphabet.filter((el) => !vowel.includes(el));
      let notEO = alphabet.filter((el) => el !== "e" && el !== "o");
      let str = el.split("");
      let isAcceptable = true;
      let vCount = 0;
      let cCount = 0;
      let last = "";

      if (str.every((char) => !vowel.includes(char))) isAcceptable = false;
      if (isAcceptable && notEO.some((char) => el.includes(char.repeat(2))))
        isAcceptable = false;
      if (isAcceptable) {
        for (let i = 0; i < str.length; i++) {
          if (vowel.includes(str[i])) {
            if (last === "v" || last === "") {
              cCount = 0;
              vCount++;
            }
          }
          if (consonant.includes(str[i])) {
            if (last === "c" || last === "") {
              vCount = 0;
              cCount++;
            }
          }
          if (vCount === 3 || cCount === 3) {
            isAcceptable = false;
            break;
          }
        }
      }

      return `<${el}> is ${isAcceptable ? "" : "not "}acceptable.`;
    })
    .join("\n")
);
