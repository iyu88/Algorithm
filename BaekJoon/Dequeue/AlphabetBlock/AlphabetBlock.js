const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
}

const Dequeue = function () {
    this.front = null;
    this.rear = null;
    this.length = 0;
    
    this.pushFront = (value) => {
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
    
    this.pushRear = (value) => {
        const node = new Node(value);
        
        if (this.length === 0) {
            this.front = node;
            this.rear = node;
        } else {
            node.prev = this.rear;
            this.rear.next = node;
            this.rear = node;
        }
        
        this.length++;
    }
    
    this.popFront = () => {
        if (this.length === 0) return null;
        
        const value = this.front.value;
        this.front = this.front.next;
        this.length--;
        return value;
    }
    
    this.popRear = () => {
        if (this.length === 0) return null;
        
        const value = this.rear.value;
        this.rear = this.rear.prev;
        this.length--;
        return value;
    }
    
    this.getAllValues = () => {
        const values = [];
        let count = this.length;
        let current = this.front;
        
        while (count--) {
            values.push(current.value);
            current = current.next;
        }
        
        return values;
    }
}

const dequeue = new Dequeue();
const stack = [];

arr.forEach(el => {
   const [type, option] = el.split(' ');
    
    switch (type) {
        case '1':
            dequeue.pushRear(option);
            stack.push(type);
            break;
        case '2':
            dequeue.pushFront(option);
            stack.push(type);
            break;
        default:
            const lastType = stack.pop();
            if (lastType === '1') {
                dequeue.popRear();
            } else if (lastType === '2') {
                dequeue.popFront();
            }
    }
});

const answer = dequeue.getAllValues().join('');

console.log(answer.length === 0 ? 0 : answer);
