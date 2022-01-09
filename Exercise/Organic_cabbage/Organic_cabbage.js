const fs = require('fs');
let [n, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

for (let i = 0; i < n; i++) {
    let next = arr.shift();
    let [x, y, num] = next.split(' ').map(el => +el);
    let land = Array.from(Array(x), () => Array(y).fill(0));
    let cases = arr.splice(0, num);
    let q = cases.map(el => el.split(' ').map(el2 => +el2));
    let answer = 0; 
    
    function DFS(a, b) {
        if (a >= 0 && a < x && b >= 0 && b < y) {
            if (land[a][b] === 1) {
                land[a][b] = 0 ;
                DFS(a + 1, b);
                DFS(a, b + 1);
                DFS(a - 1, b);
                DFS(a, b - 1);
            }
        } else {
            return;
        }        
    }
    
    q.forEach(el => {
        let [x, y] = el;
        land[x][y] = 1; 
    }); // ok 
    
    for (let a = 0 ; a < x ; a++) {
        for (let b = 0 ; b < y ; b++) {
            if(land[a][b] === 1) {
               DFS(a,b);
               answer++;
            }
        }
    }
    console.log(answer);
}
