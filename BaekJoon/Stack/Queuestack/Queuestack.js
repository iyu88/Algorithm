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
    this.size = 0;
    this.cursor = this.tail;
    
    this.addFront = value => {
        const node = new Node(value);
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
        node.prev = this.head;
        this.size++;
    }
    
    this.addRear = value => {
        const node = new Node(value);
        node.prev = this.tail.prev;
        this.tail.prev.next = node;
        this.tail.prev = node;
        node.next = this.tail;
        this.size++;
    }
    
    this.removeFront = () => {
        if (this.size === 0) return null;
        const value = this.head.next.value;
        this.head.next.next.prev = this.head;
        this.head.next = this.head.next.next;
        this.size--;
        return value;
    }
    
    this.removeRear = () => {
        if (this.size === 0) return null;
        const value = this.tail.prev.value;
        this.tail.prev.prev.next = this.tail;
        this.tail.prev = this.tail.prev.prev;
        this.size--;
        return value;
    }
}

const queue = new Queue();
const N = +inputs[0];
const arr = [];

const A = inputs[1].split(' ').map(Number);
for (let i = 0; i < N; i++) {
    arr[i] = A[i];
}

const B = inputs[2].split(' ').map(Number);
for (let i = 0; i < N; i++) {
    if (arr[i]) continue;
    queue.addRear(B[i]);
}

const M = +inputs[3];
let answer = [];

const C = inputs[4].split(' ').map(Number);
for (let i = 0; i < M; i++) {
    queue.addFront(C[i]);
    answer.push(queue.removeRear());
}

console.log(answer.join(' '));
