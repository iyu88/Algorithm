const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    
    this.size = () => {
        if (this.q[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }
    
    this.add = (value) => {
        if (!this.size()) this.q['0'] = value;
        else this.q[++this.rear] = value;
    }
    
    this.remove = () => {
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value;
    }
}

console.log(arr.map(el => {
    const [S, T] = el.split(' ').map(Number);
    const q = new queue();
    q.add([S, T, 0]);
    while (q.size()) {
        const [from, to, count] = q.remove();
        if (from === to) return count;
        if (from + from <= to + 3) {
            q.add([from + from, to + 3, count + 1]);
        }
        if (from + 1 <= to) {
            q.add([from + 1, to, count + 1]);
        }
    }
}).join('\n'));
