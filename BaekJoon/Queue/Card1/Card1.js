const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString().trim();

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
    
    this.front = () => this.length ? this.head.next.value : null;
    
    this.add = (value) => {
        const node = new Node(value);
        const prevNode = this.tail.prev;
        node.prev = prevNode;
        node.next = this.tail;
        prevNode.next = node;
        this.tail.prev = node;
        this.length++;
    }
    
    this.remove = () => {
        if (this.length === 0) return null;
        const nextNode = this.head.next;
        const value = nextNode.value;
        nextNode.next.prev = this.head;
        this.head.next = nextNode.next;
        this.length--;
        return value;
    }
}

const answer = [];
const queue = new Queue();

Array(N).fill(1).forEach((el, idx) => queue.add(el + idx));

while (queue.length !== 1) {
    answer.push(queue.remove());
    queue.add(queue.remove());
}

if (answer.length) {
    console.log(answer.join(' ') + ' ' + queue.front());
} else {
    console.log(queue.front());
}
