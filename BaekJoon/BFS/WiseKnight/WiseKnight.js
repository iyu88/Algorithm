const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
}

const Queue = function () {
    if (new.target === undefined) return new Queue();
    
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
        const first = this.head.next;
        const value = first.value;
        this.head.next = first.next;
        first.next.prev = this.head;
        this.length--;
        return value;
    }
}

const [N, M] = inputs[0].split(' ').map(Number);
const [X, Y] = inputs[1].split(' ').map(el => el - 1);
const DY = [-1, -2, -2, -1, 1, 2, 2, 1];
const DX = [-2, -1, 1, 2, 2, 1, -1, -2];
const counts = Array.from({length: N}, () => Array.from({length: N}, () => false));

const bfs = (X, Y) => {
    const queue = Queue();
    const visited = Array.from({length: N}, () => Array.from({length: N}, () => false));
    
    queue.add([X, Y, 0]);
    visited[X][Y] = true;
    counts[X][Y] = 0;
    
    while (queue.length) {
        const [currentX, currentY, currentDist] = queue.remove();
        
        for (let k = 0 ; k < 8 ; k++) {
            const dyy = DY[k] + currentY;
            const dxx = DX[k] + currentX;
            
            if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
            
            if (!visited[dxx][dyy]) {
                visited[dxx][dyy] = true;
                counts[dxx][dyy] = counts[currentX][currentY] + 1;
                queue.add([dxx, dyy]);
            }
        }
    }
}

const answer = [];

bfs(X, Y);

for (let i = 2; i < inputs.length; i++) {
    const [A, B] = inputs[i].split(' ').map(el2 => el2 - 1);
    const result = counts[A][B];
    answer.push(result);
}

console.log(answer.join(' '));
