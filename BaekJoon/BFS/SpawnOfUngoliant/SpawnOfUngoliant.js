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
    
    this.addLast = (value) => {
        const node = new Node(value);
        const next = this.head.next;
        this.head.next = node;
        node.prev = this.head;
        node.next = next;
        next.prev = node;
        this.length++;
    }
    
    this.removeFirst = () => {
        const prev = this.tail.prev;
        const value = prev.value; 
        prev.prev.next = this.tail;
        this.tail.prev = prev.prev;
        this.length--;
        return value;
    }
}

let index = 0;
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];

while (index < inputs.length-1) {
    const [W, H] = inputs[index++].split(' ').map(Number);
    const board = inputs.slice(index, index + H).map(el => el.split(''));
    const visited = Array.from({length: H}, () => Array.from({length: W}, () => false));
    const queue = new Queue();
    let [SY, SX] = [null, null];
    
    for (let y = 0 ; y < H ; y++) {
        for (let x = 0 ; x < W ; x++) {
            if (board[y][x] === 'S') {
                [SY, SX] = [y, x];
                break;
            }
        }
        if (SY && SX) break;
    }
    
    visited[SY][SX] = true;
    queue.addLast([SY, SX]);
    
    while (queue.length) {
        const [currentY, currentX] = queue.removeFirst();
        
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = DY[k] + currentY;
            const dxx = DX[k] + currentX;
            
            if (dyy >= H || dxx >= W || dyy < 0 || dxx < 0) continue;
            if (board[dyy][dxx] === '.') continue;
            if (visited[dyy][dxx]) continue;
            
            visited[dyy][dxx] = true;
            board[dyy][dxx] = 'S';
            queue.addLast([dyy, dxx]);
        }
    }
    
    console.log(board.map(el => el.join('')).join('\n'));
    
    index += H;
}
