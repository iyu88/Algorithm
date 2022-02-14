const fs = require("fs");
let N = fs.readFileSync("/dev/stdin").toString() * 1;

let answer = Array.from(Array(N), () => Array(N * 2).fill(" "));
let dNc = (xfrom, xto, yfrom, yto, num) => {
  if (num === 3) {
    let middleX = Math.floor((xfrom + xto) / 2) - 1;
    for (let y = yto; y < yfrom; y++) {
      for (let x = xfrom; x < xto - 1; x++) {
        if (y === yto && x === middleX) answer[y][x] = "*";
        else if (y === yto + 1 && (x === middleX - 1 || x === middleX + 1))
          answer[y][x] = "*";
        else if (y === yto + 2) answer[y][x] = "*";
      }
    }
  } else {
    let half = Math.floor(num / 2);
    let xhalf = Math.floor((xfrom + xto) / 2);
    let yhalf = Math.floor((yfrom + yto) / 2);
    dNc(xfrom, xhalf, yfrom, yhalf, half);
    dNc(xhalf, xto, yfrom, yhalf, half);
    dNc(xhalf - half, xhalf + half, yhalf, yto, half);
  }
};

dNc(0, N * 2, N, 0, N);
console.log(answer.map((el) => el.join("")).join("\n"));
