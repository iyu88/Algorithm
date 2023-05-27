const fs = require('fs');
const [T, A, B] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const Queue = function () {
    this.q = {};
    this.front = this.rear = this.length = 0;
    
    this.add = (value) => {
        if (this.length === 0) this.q[this.rear] = value;
        else this.q[++this.rear] = value;
        this.length++;
    }
    
    this.remove = () => {
        if (this.length === 0) return null;;
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front !== this.rear) this.front++;
        this.length--;
        return value;
    }
}

const bfs = () => {
    const visited = Array.from({length : 5000000}, () => Array.from({length: 2}, () => false));
    const queue = new Queue();
    let answer = 0;

    visited[0][0] = true;
    queue.add([0, 0]);
    
    while (queue.length) {
        const [current, isWater] = queue.remove();
        answer = Math.max(answer, current);
        
        const calcA = current + A;
        const calcB = current + B;
        const calcHalf = Math.floor(current / 2);
        const notWater = isWater ? 0 : 1;
        
        if (calcA <= T && visited[calcA][isWater] === false) {
            visited[calcA][isWater] = true;
            queue.add([calcA, isWater]);
        }
        
        if (calcB <= T && visited[calcB][isWater] === false) {
            visited[calcB][isWater] = true;
            queue.add([calcB, isWater]);
        }
        
        if (!isWater && visited[calcHalf][notWater] === false) {
            visited[calcHalf][notWater] = true;
            queue.add([calcHalf, notWater]);
        }
    }
    
    return answer;
}

console.log(bfs());
