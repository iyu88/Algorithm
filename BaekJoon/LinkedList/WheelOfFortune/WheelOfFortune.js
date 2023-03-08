const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
    
    this.pushFirst = (value) => {
        const node = new Node(value);
        const nextNode = this.head.next;
        node.next = nextNode;
        node.prev = this.head;
        nextNode.prev = node;
        this.head.next = node;
        this.length++;
    }
    
    this.pushLast = (value) => {
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
        nextNode.next.prev = this.head;
        this.head.next = nextNode.next;
        this.length--;
        return value;
    }
    
    this.removeLast = () => {
        if (this.length === 0) return null;
        const prevNode = this.tail.prev;
        const value = prevNode.value;
        prevNode.prev.next = this.tail;
        this.tail.prev = prevNode.prev;
        this.length--;
        return value;
    }
    
    this.moveCursor = (times) => {
        while (times--) {
            if (this.cursor.next !== this.tail) {
                this.cursor = this.cursor.next;
            } else {
                this.cursor = this.head.next;
            }
        }
    }
    
    this.getCursorValue = () => {
        return this.cursor.value;
    }
    
    this.setCursorValue = (value) => {
        this.cursor.value = value;
    }
    
    this.printCounterClockwise = () => {
        const values = [];
        let times = this.length;
        let currentNode = this.cursor;
        
        while (times--) {
            const value = currentNode.value;
            values.push(value === undefined ? '?' : value);
            if (currentNode.prev !== this.head) {
                currentNode = currentNode.prev;
            } else {
                currentNode = this.tail.prev;
            }
        }
        
        return values;
    }
}

const [N, M] = nums.split(' ').map(Number);
const dll = new DoublyLinkedList();
const dict = {};
let flag = true;

const addDict = (char) => dict[char] = true;

const checkDict = (char) => Object.keys(dict).includes(char);

for (let i = 0 ; i < N ; i++) {
    dll.pushFirst(undefined);
}

for (let i = 0 ; i < M ; i++) {
    const [times, char] = arr[i].split(' ');
    dll.moveCursor(times);
    const cursorValue = dll.getCursorValue();
    if (cursorValue === char) continue;
    if (cursorValue === undefined && !checkDict(char)) {
        dll.setCursorValue(char);
        addDict(char);
        continue;
    }
    if (cursorValue !== char) {
        flag = false;
        break;
    }
}

console.log(flag ? dll.printCounterClockwise().join('') : "!");
