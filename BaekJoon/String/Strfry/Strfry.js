const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = arr.map((el) => {
  let objArr = [{}, {}];
  el.split(" ").map((el2, i) => {
    el2.split("").forEach((el3) => {
      if (objArr[i][el3] === undefined) objArr[i][el3] = 1;
      else objArr[i][el3]++;
    });
  });
  if (Object.keys(objArr[0]).length !== Object.keys(objArr[1]).length)
    return "Impossible";
  for (let i = 0; i < Object.keys(objArr[0]).length; i++) {
    let key = Object.keys(objArr[0])[i];
    if (objArr[1][key] !== objArr[0][key]) return "Impossible";
  }
  return "Possible";
});

console.log(answer.join("\n"));
