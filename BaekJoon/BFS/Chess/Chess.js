const fs = require('fs');
const [num, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    this.length = 0;
    
    this.add = (value) => {
        if (this.length === 0) this.q[this.rear] = value;
        else this.q[++this.rear] = value;
        this.length++;
    }
    
    this.remove = () => {
        if (this.length === 0) return null;
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front !== this.rear) this.front++;
        this.length--;
        return value;
    }
}

const N = +num;
const DY = [-1, 1, 1, -1];
const DX = [-1, -1, 1, 1];

const convertPos = (el) => {
    const [y, x] = el;
    return `${String.fromCharCode(y+65)} ${x+1}`
}

const bfs = (y1, x1, y2, x2) => {
    const visited = Array.from({length: 8}, () => Array.from({length: 8}, () => false));
    visited[y1][x1] = true;
    
    const queue = new Queue();
    queue.add([y1, x1, [[y1, x1]]]);
    
    while (queue.length) {
        const [curY, curX, routes] = queue.remove();
        if (curY === y2 && curX === x2) return (routes.length-1) + ' ' + routes.map(el => convertPos(el)).join(' ');
        if (routes.length > 4) continue;
        for (let k = 0 ; k < 4 ; k++) {
            let dyy = curY;
            let dxx = curX;
            
            while (true) {
                dyy += DY[k];
                dxx += DX[k];
                if (dyy < 0 || dxx < 0 || dyy >= 8 || dxx >= 8) break;
                
                if (!visited[dyy][dxx]) {
                    visited[dyy][dxx] = true;
                    queue.add([dyy, dxx, [...routes, [dyy, dxx]]]);
                }
            }
        }
    }
    
    return 'Impossible';
}

const cases = input.map(el => {
    const [y1, x1, y2, x2] = el.split(' ');
    return bfs(y1.charCodeAt(0)-65, x1-1, y2.charCodeAt(0)-65, x2-1);
});

console.log(cases.join('\n'));
