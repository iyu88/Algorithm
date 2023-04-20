const fs = require('fs');
const [num, inputs, targets] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
const M = inputs.split(' ').map(Number);
const T = targets.split(' ').map(Number);

const bfs = (start, end) => {
    const Q = new Queue();
    const V = {};
    V[start] = 1;
    Q.add([start, 1]);
    
    while (Q.length) {
        const [current, count] = Q.remove();
        let next = current % M[current-1];
        if (!next) next += M[current-1];
        
        while (next <= N) {
            if (!V[next]) {
                V[next] = count + 1;
                Q.add([next, count + 1]);
            }
            if (V[end]) return V[end]-1;
            next += M[current-1];
        }
    }
    
    return -1;
}

console.log(bfs(...T));
