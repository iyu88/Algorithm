const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
}

const Queue = function () {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
    
    this.add = value => {
        const node = new Node(value);
        const prev = this.tail.prev;
        node.next = this.tail;
        node.prev = prev;
        prev.next = node;
        this.tail.prev = node;
        this.length++;
    }
    
    this.remove = () => {
        const first = this.head.next;
        const value = first.value;
        this.head.next = first.next;
        first.next.prev = this.head;
        this.length--;
        return value;
    }
}

const [N, M] = inputs[0].split(' ').map(Number);
const [Hx, Hy] = inputs[1].split(' ').map(el => el - 1);
const [Ex, Ey] = inputs[2].split(' ').map(el => el - 1);
const DY = [-1, 0, 1, 0];
const DX = [0, 1, 0, -1];
const board = inputs.slice(3).map(el => el.split(' ').map(Number));

const bfs = (startX, startY) => {
    const queue = new Queue();
    const visited = Array.from({length: 2}, () => Array.from({length: N}, () => Array.from({length: M}, () => false)));
    
    queue.add([0, startX, startY, 0]);
    visited[0][startX][startY] = true;
    
    while (queue.length) {
        const [z, x, y, t] = queue.remove();
        if (x === Ex && y === Ey) return t;
        
        for (let k = 0 ; k < 4 ; k++) {
            const dxx = x + DX[k];
            const dyy = y + DY[k];
            
            if (dyy < 0 || dxx < 0 || dyy >= M || dxx >= N) continue;
            
            if (board[dxx][dyy] === 1) {
                if (z === 0 && visited[1][dxx][dyy] === false) {
                    visited[1][dxx][dyy] = true;
                    queue.add([1, dxx, dyy, t + 1]);
                }
            } else {
                if (visited[z][dxx][dyy] === false) {
                    visited[z][dxx][dyy] = true;
                    queue.add([z, dxx, dyy, t + 1]);
                }
            }
        }
    }
    
    return -1;
}

console.log(bfs(Hx, Hy));
