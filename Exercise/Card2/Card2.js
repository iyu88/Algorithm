const fs = require('fs');
let num = fs.readFileSync('/dev/stdin').toString().trim();

function Node (value, next = null) {
    this.value = value;
    this.next = next;
}

function LinkedList () {
    this.head = null;
    this.tail = null;
    this.size= 0;
    
    this.add = (value) => {
        let node = new Node(value);
        if (!this.size) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }
    
    this.remove = () => {
        let value = this.head.value;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        this.size--;
        return value;
    }
}

let LL = new LinkedList();
for (let i = 1; i <= Number(num); i++) {
    LL.add(i);
}
while (LL.size !== 1) {
    LL.remove();
    let front = LL.remove();
    LL.add(front);
}
console.log(LL.head.value);
