const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
}

const Queue = function () {
    this.head = new Node(null);
    this.tail = new Node(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
    
    this.add = value => {
        const node = new Node(value);
        const tailPrev = this.tail.prev;
        node.prev = tailPrev;
        node.next = this.tail;
        tailPrev.next = node;
        this.tail.prev = node;
        this.length++;
    }
    
    this.remove = () => {
        if (this.length === 0) return null;
        const headNext = this.head.next;
        const value = headNext.value;
        this.head.next = headNext.next;
        headNext.next.prev = this.head;
        this.length--;
        return value;
    }
}

let index = 0;
const [R, C] = inputs[index++].split(' ').map(Number);
const board = inputs.slice(index, index + R).map(line => line.split('').map(Number));
const [Y, X, K] = inputs[index + R].split(' ').map(Number);
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];

const bfs = (Y, X, K) => {
    const visited = Array.from({length: R}, () => Array.from({length: C}, () => false));
    const originColor = board[Y][X];
    const queue = new Queue();
    
    board[Y][X] = K;
    visited[Y][X] = true;
    queue.add([Y, X]);
    
    while (queue.length) {
        const [currentY, currentX] = queue.remove();
        
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = currentY + DY[k];
            const dxx = currentX + DX[k];
            
            if (dyy < 0 || dxx < 0 || dyy >= R || dxx >= C) continue;
            if (visited[dyy][dxx]) continue;
            if (board[dyy][dxx] !== originColor) continue;
            
            board[dyy][dxx] = K;
            visited[dyy][dxx] = true;
            queue.add([dyy, dxx]);
        }
    }
}

bfs(Y, X, K);

console.log(board.map(line => line.join('')).join('\n'));
