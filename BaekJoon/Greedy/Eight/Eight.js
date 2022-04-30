const fs = require("fs");
let [N, M] = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

if (N.toString().length !== M.toString().length) console.log(0);
else {
  let count = 0;
  let len = N.toString().length;
  for (let i = 0; i < len; i++) {
    if (N.charAt(i) === M.charAt(i)) {
      if (Number(N.charAt(i)) === 8) count++;
    } else break;
  }
  console.log(count);
}
