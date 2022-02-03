const fs = require('fs');
let [n, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

for(let i = 0 ; i < n ; i++) {
    let size = arr.shift();
    let q = [];
    let values = arr.splice(0, size);
    let board = values.map(el => el.split(''));
    let answer = 0;
    
    for (let m = 0; m < size; m++) {
        for (let k = 0; k < size; k++) {
            board[m][k] === 'w' ? q.push([m,k]) : q = q;
        }
    }
    
    while (q.length > 0) {
        let [y, x] = q.shift();
        if ( board[y][x] === 'w') {
            if ( y + 1 < size && board[y+1][x] === '-' ) {
                answer++;
                board[y+1][x] = 'w';
                q.push([y+1, x]);
            }
            if ( y - 1 > -1 && board[y-1][x] === '-' ) {
                answer++;
                board[y-1][x] = 'w';
                q.push([y-1, x]);
            }
            if ( x + 1 < size && board[y][x+1] === '-' ) {
                answer++;
                board[y][x+1] = 'w';
                q.push([y, x+1]);
            }
            if ( x - 1 > -1 && board[y][x-1] === '-' ) {
                answer++;
                board[y][x-1] = 'w';
                q.push([y, x-1]);
            }
            if ( y + 1 < size && x + 1 < size && board[y+1][x+1] === '-' ) {
                answer++;
                board[y+1][x+1] = 'w';
                q.push([y+1, x+1]);
            }
            if ( y + 1 < size && x - 1 > -1 && board[y+1][x-1] === '-' ) {
                answer++;
                board[y+1][x-1] = 'w';
                q.push([y+1, x-1]);
            }
            if ( y - 1 > -1 && x + 1 < size && board[y-1][x+1] === '-' ) {
                answer++;
                board[y-1][x+1] = 'w';
                q.push([y-1, x+1]);
            }
            if ( y - 1 > -1 && x - 1 > -1 && board[y-1][x-1] === '-' ) {
                answer++;
                board[y-1][x-1] = 'w';
                q.push([y-1, x-1]);
            }
        }
    }
    console.log(answer);
}
