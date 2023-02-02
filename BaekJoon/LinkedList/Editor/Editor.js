const fs = require('fs');
const [origin_string, command_count, ...commands] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
    
    this.printAll = () => {
        const contents = [];
        let node = this.head;
        while (node.next.value) {
            contents.push(node.next.value);
            node = node.next;
        }
        return contents.join('');
    }
    
    this.moveCursorLeft = () => {
        if (this.head.next !== this.cursor) this.cursor = this.cursor.prev;
    }
    
    this.moveCursorRight = () => {
        if (this.tail !== this.cursor) this.cursor = this.cursor.next;
    }
    
    this.removeCursorLeft = () => {
        if (this.size === 0) return null;
        if (this.head.next === this.cursor) return null;
        const value = this.cursor.prev.value;
        this.cursor.prev.prev.next = this.cursor;
        this.cursor.prev = this.cursor.prev.prev;
        this.size--;
        return value;
    }
    
    this.addCursorLeft = (newChar) => {
        const node = new Node(newChar);
        node.prev = this.cursor.prev;
        this.cursor.prev.next = node;
        this.cursor.prev = node;
        node.next = this.cursor;
        this.size++;
    }
}

const DLL = new DoublyLinkedList();

origin_string.split('').forEach(char => DLL.addRear(char));
commands.forEach(command => {
    const [kind, newChar] = command.split(' ');
    if (kind === 'L') {
        DLL.moveCursorLeft();
    } else if (kind === 'D') {
        DLL.moveCursorRight();
    } else if (kind === 'B') {
        DLL.removeCursorLeft();
    } else {
        DLL.addCursorLeft(newChar);
    }
});

console.log(DLL.printAll());
