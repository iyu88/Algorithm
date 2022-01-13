const fs = require('fs');
let arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

while (arr.length !== 1) {
    let size = arr.shift();
    let [w, h] = size.split(' ').map(el => +el);
    let temp = arr.splice(0, h);
    let $map = temp.map(el => el.split(' ').map(el2 => +el2));
    let answer = 0;
    let dy = [-1, -1, -1, 0, 1, 1, 1, 0];
    let dx = [-1, 0, 1, 1, 1, 0, -1, -1];
    
    const dfs = (i, j) => {
        if ($map[i][j] === 1) {
            $map[i][j] = 0;
            for(let k = 0; k < 8; k++) {
                let idy = i + dy[k];
                let jdx = j + dx[k];
                if (idy > -1 && idy < h && jdx > -1 && jdx < w) {
                    dfs(idy, jdx);
                }
            }
        }
        return;
    }
    
    for (let i = 0 ; i < h ; i++) {
        for (let j = 0 ; j < w ; j++) {
            if ($map[i][j] === 1) {
                dfs(i,j);
                answer++;
            }
        }
    }
    console.log(answer);
}
