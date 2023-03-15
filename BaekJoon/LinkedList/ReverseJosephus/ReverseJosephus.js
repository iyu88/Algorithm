const fs = require('fs');
const [N, K, M] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const Node = function (value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
}

const DoublyLinkedList = function () {
    this.head = new Node(null);
    this.tail = new Node(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
    this.cursor = this.head;
    
    this.addFirst = (value) => {
        const node = new Node(value);
        const nextNode = this.head.next;
        node.next = nextNode;
        node.prev = this.head;
        nextNode.prev = node;
        this.head.next = node;
        this.length++;
    }
    
    this.addLast = (value) => {
        const node = new Node(value);
        const prevNode = this.tail.prev;
        node.prev = prevNode;
        node.next = this.tail;
        prevNode.next = node;
        this.tail.prev = node;
        this.length++;
    }
    
    this.removeFirst = () => {
        if (this.length === 0) return null;
        const nextNode = this.head.next;
        const value = nextNode.value;
        this.head.next = nextNode.next;
        nextNode.next.prev = this.head;
        this.length--;
        return value;
    }
    
    this.removeLast = () => {
        if (this.length === 0) return null;
        const prevNode = this.tail.prev;
        const value = prevNode.value;
        this.tail.prev = prevNode.prev;
        prevNode.prev.next = this.tail;
        this.length--;
        return value;
    }
    
    this.rotateRight = (step) => {
        while (step--) {
            if (this.cursor.next !== this.tail) {
                this.cursor = this.cursor.next;
            } else {
                this.cursor = this.head.next;
            }
        }
    }
    
    this.rotateLeft = (step) => {
        while (step--) {
            if (this.cursor.prev !== this.head) {
                this.cursor = this.cursor.prev;
            } else {
                this.cursor = this.tail.prev;
            }
        }
    }
    
    this.removeCursor = () => {
        if (this.length === 0) return null;
        const value = this.cursor.value;
        const prevNode = this.cursor.prev;
        const nextNode = this.cursor.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        this.length--;
        return value;
    }
}

const answer = [];
const dll = new DoublyLinkedList();
Array(N).fill(1).forEach((el, idx) => dll.addLast(el + idx));
let isRight = true;
let count = 0;

while (dll.length) {
    if (isRight) {
        dll.rotateRight(K);        
    } else {
        dll.rotateLeft(K);
    }
    answer.push(dll.removeCursor());
    if (++count % M === 0) isRight = !isRight;
}

console.log(answer.join('\n'));
