const fs = require('fs');
const [_, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value) {
    this.prev = null;
    this.next = null;
    this.value = value;
}

const Dequeue = function () {
    this.front = null;
    this.rear = null;
    this.length = 0;
    
    this.addFirst = (value) => {
        const node = new Node(value);
        
        if (this.length === 0) {
            this.front = node;
            this.rear = node;
        } else {
            node.next = this.front;
            this.front.prev = node;
            this.front = node;
        }
        
        this.length++;
    }
    
    this.addLast = (value) => {
        const node = new Node(value);
        
        if (this.length === 0) {
            this.front = node;
            this.rear = node;
        } else {
            this.rear.next = node;
            node.prev = this.rear;
            this.rear = node;
        }
        
        this.length++;
    }
    
    this.removeFirst = () => {
        if (this.length === 0) return null;
        const value = this.front.value;
        this.front = this.front.next;
        this.length--;
        return value;
    }
    
    this.removeLast = () => {
        if (this.length === 0) return null;
        const value = this.rear.value;
        this.rear = this.rear.prev;
        this.length--;
        return value;
    }
    
    this.getAllValues = () => {
        const values = [];
        let temp = this.front;
        
        while (temp) {
            values.push(temp.value);
            temp = temp.next;
        }
        
        return values;
    }
}

const dequeue = new Dequeue();
arr.split(' ')
   .reverse()
   .forEach((el, index) => {
    const value = index + 1;
    if (el === '1') {
        dequeue.addFirst(value);
    } else if (el === '2') {
        const first = dequeue.removeFirst();
        dequeue.addFirst(value);
        dequeue.addFirst(first);
    } else {
        dequeue.addLast(value);
    }
});

console.log(dequeue.getAllValues().join(' '));
