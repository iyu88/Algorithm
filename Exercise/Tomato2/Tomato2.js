const fs = require('fs');
let [sizes, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [M, N] = sizes.split(' ').map(el => +el);
let visited = Array.from(Array(N), () => Array(M).fill(false));
let $map = arr.map(el => el.split(' ').map(el2 => +el2));

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let q;
let next = [];
let zero = 0;
let day = -1;

for (let y = 0 ; y < N ; y++) {
    for (let x = 0 ; x < M ; x++) {
        if ($map[y][x] === 1) {
            next.push([y, x]);
        } else if ($map[y][x] === 0) {
            zero++;
        }
    }
}

if (zero === 0) {
    console.log(zero);
} else {
    while (next.length) {
        q = next.splice(0);
        while (q.length) {
            let [y, x] = q.pop();
            if ($map[y][x] === 1 && !visited[y][x]) {
                visited[y][x] = true;
                for (let k = 0; k < dy.length; k++) {
                    let dyy = dy[k] + y;
                    let dxx = dx[k] + x; 
                    if (dyy < N && dyy > - 1 && dxx < M && dxx > -1) {
                        if ($map[dyy][dxx] === 0) {
                            $map[dyy][dxx] = 1;
                            zero--;
                            next.push([dyy, dxx]);
                        }
                    }
                }
            }
        }
        day++;
    }

    console.log(zero ? -1 : day);
}
