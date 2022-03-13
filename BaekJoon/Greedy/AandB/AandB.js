const fs = require("fs");
let [S, T] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

while (S !== T && S.length <= T.length) {
  if (T.charAt(T.length - 1) === "B") {
    T = T.substr(0, T.length - 1);
    T = T.split("").reverse().join("");
  } else if (T.charAt(T.length - 1) === "A") {
    T = T.substr(0, T.length - 1);
  }
}

console.log(S === T ? 1 : 0);
