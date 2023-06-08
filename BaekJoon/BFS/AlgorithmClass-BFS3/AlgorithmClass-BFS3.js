const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
}

const Queue = function () {
    if (new.target === undefined) return new Queue();
    
    this.head = new Node(null);
    this.tail = new Node(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.length = 0;
    
    this.add = value => {
        const node = new Node(value);
        const tailPrev = this.tail.prev;
        node.prev = tailPrev;
        node.next = this.tail;
        tailPrev.next = node;
        this.tail.prev = node;
        this.length++;
    }
    
    this.remove = () => {
        if (this.length === 0) return null;
        const first = this.head.next;
        const value = first.value;
        this.head.next = first.next;
        first.next.prev = this.head;
        this.length--;
        return value;
    }
}

const [N, _, R] = nums.split(' ').map(Number);
const points = Array.from({length: N+1}, () => []);
inputs.map(el => {
    const [a, b] = el.split(' ').map(Number);
    points[a].push(b);
    points[b].push(a);
});
const sorted = points.map(el => el.sort((a, b) => b - a));

const bfs = (start) => {
    const queue = new Queue();
    const visited = Array.from({length: N+1}, () => -1);   
    let order = -1;

    visited[start] = 0;
    queue.add([start, 0]);

    
    while (queue.length) {
        const [current, depth] = queue.remove();
        
        for (const next of sorted[current]) {
            if (visited[next] === -1) {
                visited[next] = depth + 1;
                queue.add([next, depth + 1]);
            }
        }
    }
    
    return visited;
}

console.log(bfs(R).slice(1).join('\n'));
