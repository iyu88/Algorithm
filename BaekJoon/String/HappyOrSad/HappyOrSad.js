const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim();

let count = {
  happy: 0,
  sad: 0,
};

count["happy"] = str.split(":-)").length - 1;
count["sad"] = str.split(":-(").length - 1;

if (count["happy"] === 0 && count["sad"] === 0) {
  console.log("none");
} else if (count["happy"] === count["sad"]) {
  console.log("unsure");
} else if (count["happy"] > count["sad"]) {
  console.log("happy");
} else if (count["happy"] < count["sad"]) {
  console.log("sad");
}
