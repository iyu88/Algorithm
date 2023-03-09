const fs = require('fs');
const [size, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    this.length = 0;
    
    this.add = (value) => {
        if (this.length === 0) this.q['0'] = value;
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

const queue = new Queue();
const N = +size;
input.forEach(el => {
    if (el == '-1') return;
    if (el == '0' && queue.length) {
        queue.remove();
        return;
    }
    if (queue.length < N) {
        queue.add(el);
    }
});

const answer = [];

while (queue.length) {
    answer.push(queue.remove());
}

console.log(answer.length ? answer.join(' ') : 'empty');
