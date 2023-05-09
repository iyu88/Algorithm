const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    this.q = {};
    this.front = this.rear = this.length = 0;
    
    this.add = value => {
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

let index = 0;
const K = +inputs[index++];
const [W, H] = inputs[index++].split(' ').map(Number);
const board = inputs.slice(index).map(el => el.split(' ').map(Number));
const DY = [-1, 0, 1, 0, -1, -2, -2, -1, 1, 2, 2, 1];
const DX = [0, 1, 0, -1, -2, -1, 1, 2, 2, 1, -1, -2];

const bfs = (startY, startX, endY, endX) => {
    const queue = new Queue();
    const visited = Array.from({length: K+1}, () => Array.from({length: H}, () => Array.from({length: W}, () => false)));
    
    queue.add([startY, startX, 0, 0]);
    visited[0][startY][startX] = true;
    
    while (queue.length) {
        const [currentY, currentX, horseMove, count] = queue.remove();
        if (currentY === endY && currentX === endX) return count;
        
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = DY[k] + currentY;
            const dxx = DX[k] + currentX;
            
            if (dyy < 0 || dxx < 0 || dyy >= H || dxx >= W) continue;
            if (visited[horseMove][dyy][dxx] || board[dyy][dxx]) continue;
            
            visited[horseMove][dyy][dxx] = true;
            queue.add([dyy, dxx, horseMove, count + 1]);
        }
        
        if (horseMove < K) {
            for (let k = 4 ; k < 12 ; k++) {
                const dyy = DY[k] + currentY;
                const dxx = DX[k] + currentX;
                
                if (dyy < 0 || dxx < 0 || dyy >= H || dxx >= W) continue;
                if (visited[horseMove + 1][dyy][dxx] || board[dyy][dxx]) continue;
                
                visited[horseMove + 1][dyy][dxx] = true;
                queue.add([dyy, dxx, horseMove + 1, count + 1]);
            }
        }
    }
    
    return -1;
}

console.log(bfs(0, 0, H-1, W-1));
