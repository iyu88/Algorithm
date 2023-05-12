const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString();

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
    
    this.addFirst = (value) => {
        const node = new Node(value);
        const next = this.head.next;
        next.prev = node;
        node.next = next;
        node.prev = this.head;
        this.head.next = node;
        this.length++;
    }
    
    this.removeFirst = () => {
        if (this.length === 0) return null;
        const next = this.head.next;
        const value = next.value;
        this.head.next = next.next;
        next.next.prev = this.head;
        this.length--;
        return value;
    }
    
    this.addLast = (value) => {
        const node = new Node(value);
        const prev = this.tail.prev;
        prev.next = node;
        node.prev = prev;
        node.next = this.tail;
        this.tail.prev = node;
        this.length++;
    }
    
    this.removeLast = () => {
        if (this.length === 0) return null;
        const prev = this.tail.prev;
        const value = prev.value;
        this.tail.prev = prev.prev; 
        prev.prev.next = this.tail;
        this.length--;
        return value;
    }
    
    this.printAll = () => {
        const values = [];
        let currentNode = this.head.next;
        while (currentNode.value !== null) {
            values.push(currentNode.value);
            currentNode = currentNode.next;
        }
        
        return values;
    }
}

const DLL = new DoublyLinkedList();
let num = N;

for (let i = N; i > 0 ; i--) {
	DLL.addFirst(i);
    for (let j = 0 ; j < i ; j++) {
        DLL.addFirst(DLL.removeLast());
    }
}

console.log(DLL.printAll().join(' '));
