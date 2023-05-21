const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

const [X, Y, _] = nums.split(' ').map(Number);
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
const pools = {};
inputs.forEach(el => {
   pools[el] = true; 
});

const bfs = (startX = 0, startY = 0) => {
    const queue = new Queue();
    const visited = {};
    
    queue.add([startX, startY, 0]);
    visited[`${startX} ${startY}`] = true;
    
    while (queue.length) {
        const [currentX, currentY, times] = queue.remove();
        if (currentX === X && currentY === Y) return times;
        
        for (let k = 0 ; k < 4 ; k++) {
            const dxx = DX[k] + currentX;
            const dyy = DY[k] + currentY;
            
            if (Math.abs(dxx) >= 500 || Math.abs(dyy) >= 500) continue;
            if (visited[`${dxx} ${dyy}`] || pools[`${dxx} ${dyy}`]) continue;
            
            visited[`${dxx} ${dyy}`] = true;
            queue.add([dxx, dyy, times + 1]);
        }
    }
}

console.log(bfs());