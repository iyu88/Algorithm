const fs = require('fs');
const [nums, trucks] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    if (new.target === undefined) return new Queue();
    
    this.q = {};
    this.front = this.rear = 0;
    this.length = 0;
    
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

const [N, W, L] = nums.split(' ').map(Number);
const T = trucks.split(' ').map(Number);
const Q = new Queue();

let weight = 0;
let index = 0;
let time = 0;

for (let i = 0 ; i < W ; i++) {
    Q.add(0);
}

while (index < N || weight) {
    time++;
    const first = Q.remove();
    weight -= first;
    const next = +T[index];
    if (weight + next <= L) {
        weight += next;
        Q.add(next);
        index++;
    } else {
        Q.add(0);
    }
}

console.log(time);
