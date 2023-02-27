const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
    this.size = 0;
    this.cursor = this.tail;
    
    this.addFirst = value => {
        const node = new Node(value);
        const nextNode = this.head.next;
        node.next = nextNode;
        node.prev = this.head;
        nextNode.prev = node;
        this.head.next = node;
        this.size++;
    }
    
    this.addLast = value => {
        const node = new Node(value);
        const prevNode = this.tail.prev;
        node.prev = prevNode;
        node.next = this.tail;
        prevNode.next = node;
        this.tail.prev = node;
        this.size++;
    }
    
    this.removeFirst = () => {
        if (this.size === 0) return null;
        const nextNode = this.head.next
        const value = nextNode.value;
        this.head.next = nextNode.next;
        nextNode.next.prev = this.head;
        this.size--;
        return value;
    }
    
    this.removeLast = () => {
        if (this.size === 0) return null;
        const prevNode = this.tail.prev;
        const value = prevNode.value;
        this.tail.prev = prevNode.prev;
        prevNode.prev.next = this.tail;
        this.size--;
        return value;
    }
    
    this.decreaseCursorPos = () => {
        if (this.head.next !== this.cursor) this.cursor = this.cursor.prev;
    }
    
    this.increaseCursorPos = () => {
        if (this.tail !== this.cursor) this.cursor = this.cursor.next;
    }
    
    this.insertBeforeCursor = (value) => {
        const node = new Node(value);
        const prevNode = this.cursor.prev;
        node.prev = prevNode;
        node.next = this.cursor;
        prevNode.next = node;
        this.cursor.prev = node;
        this.size++;
    }
    
    this.removeBeforeCursor = () => {
        if (this.size === 0) return null;
        if (this.head.next === this.cursor) return null;
        const prevNode = this.cursor.prev;
        const value = prevNode.value;
        prevNode.prev.next = this.cursor;
        this.cursor.prev = prevNode.prev;        
        this.size--;
        return value;
    }
    
    this.printAll = () => {
        let str = '';
        let node = this.head;
        while (node.next.value) {
            str += node.next.value;
            node = node.next;
        }
        return str;
    }
}

arr.forEach(str => {
    const chars = str.split('');
    const dll = new DoublyLinkedList();
    chars.forEach(char => {
       if (char === '<') {
           dll.decreaseCursorPos();
       } else if (char === '>') {
           dll.increaseCursorPos();
       } else if (char === '-') {
           dll.removeBeforeCursor();
       } else {
           dll.insertBeforeCursor(char);
       }
    });
    console.log(dll.printAll());
});
