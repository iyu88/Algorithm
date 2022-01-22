const fs = require('fs');
let [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [M, N, H] = nums.split(' ').map(el => +el);
let visited = Array.from(Array(H), () => Array.from(Array(N), () => Array(M).fill(false)));
let temp = arr.map(el => el.split(' ').map(el2 => +el2));
let $map = [];
while(temp.length) {
    $map.push(temp.splice(0, N));
}

let dz = [-1, 1, 0, 0, 0, 0];
let dy = [0, 0, -1, 0, 1, 0];
let dx = [0, 0, 0, 1, 0, -1];

let q;
let next = [];
let zero = 0;
let day = -1;

for (let z = 0 ; z < H ; z++) {
    for (let y = 0; y < N ; y++) {
        for (let x = 0; x < M ; x++) {
            if ($map[z][y][x] === 1) {
                next.push([z, y, x]);
            } else if ($map[z][y][x] === 0) {
            		zero++;
            }
        }
    }
}

while (next.length) {
    day++;
    q = next.slice(0);
    next = [];
    while (q.length) {
      let [z, y, x] = q.pop();
      if (!visited[z][y][x] && $map[z][y][x] === 1) {
          visited[z][y][x] = true;
          for (let k = 0 ; k < dz.length ; k++) {
              let dzz = z + dz[k];
              let dyy = y + dy[k];
              let dxx = x + dx[k];
              if (dzz < H && dzz > -1 && dyy < N && dyy > -1 && dxx < M && dxx > -1) {
                  if ($map[dzz][dyy][dxx] === 0) {
                      next.push([dzz, dyy, dxx]);
                      $map[dzz][dyy][dxx] = 1;
                      zero--;
                  }
              }
          }
      }
    }
}

console.log(zero ? -1 : day);
