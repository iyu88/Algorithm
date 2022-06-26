const fs = require("fs");
let arr = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let answer = [];

const queue = function () {
  this.q = {};
  this.front = this.rear = 0;

  this.size = () => {
    if (this.q[this.rear] === undefined) return 0;
    else return this.rear - this.front + 1;
  };

  this.add = (obj) => {
    if (!this.size()) this.q["0"] = obj;
    else {
      this.rear++;
      this.q[this.rear] = obj;
    }
  };

  this.remove = () => {
    let v = this.q[this.front];
    delete this.q[this.front];
    if (this.front === this.rear) this.front = this.rear = 0;
    else this.front++;
    return v;
  };
};

while (arr.length !== 1) {
  let [L, R, C] = arr.shift().split(" ").map(Number);
  let result;
  let visited = Array(L)
    .fill(null)
    .map((el) =>
      Array(R)
        .fill(null)
        .map((el2) => Array(C).fill(false))
    );
  let $case = [];
  for (let i = 0; i < L; i++) {
    $case.push(arr.splice(0, R).map((el) => el.split("")));
    arr.shift();
  }
  let points = Array(2).fill(null);
  let dz = [1, -1, 0, 0, 0, 0];
  let dy = [0, 0, -1, 1, 0, 0];
  let dx = [0, 0, 0, 0, -1, 1];

  for (let z = 0; z < L; z++) {
    for (let y = 0; y < R; y++) {
      for (let x = 0; x < C; x++) {
        if ($case[z][y][x] === "S") points[0] = [z, y, x];
        else if ($case[z][y][x] === "E") points[1] = [z, y, x];
      }
    }
  }

  const bfs = () => {
    let [sz, sy, sx] = points[0];
    let [ez, ey, ex] = points[1];
    let $q = new queue();
    visited[sz][sy][sx] = true;
    $q.add({ z: sz, y: sy, x: sx, t: 0 });
    while ($q.size()) {
      let { z: nz, y: ny, x: nx, t: nt } = $q.remove();
      if (nz === ez && ny === ey && nx === ex) {
        result = nt;
        break;
      } else {
        for (let k = 0; k < 6; k++) {
          let dzz = dz[k] + nz;
          let dyy = dy[k] + ny;
          let dxx = dx[k] + nx;
          if (
            dzz > -1 &&
            dzz < L &&
            dyy > -1 &&
            dyy < R &&
            dxx > -1 &&
            dxx < C &&
            !visited[dzz][dyy][dxx] &&
            $case[dzz][dyy][dxx] !== "#"
          ) {
            visited[dzz][dyy][dxx] = true;
            $q.add({ z: dzz, y: dyy, x: dxx, t: nt + 1 });
          }
        }
      }
    }
    answer.push(result ? `Escaped in ${result} minute(s).` : "Trapped!");
  };

  bfs();
}

console.log(answer.join("\n"));
