const fs = require('fs');
const [targets, nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    
    this.size = () => {
        if (this.q[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }
    
    this.add = (value) => {
        if (!this.size()) this.q['0'] = value;
        else this.q[++this.rear] = value;
    }
    
    this.remove = () => {
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value;
    }
}

const [A, B] = targets.split(' ').map(Number);
const [N, M] = nums.split(' ').map(Number);
const points = Array(N+1).fill(null).map(el => []);
arr.forEach(el => {
    const [from, to] = el.split(' ').map(Number);
    points[from].push(to);
    points[to].push(from);
});


const bfs = (A, B) => {
    const q = new queue();
    const answer = Array(N+1).fill(false);
    answer[A] = 0;
    q.add(A);
    while (q.size()) {
        const next = q.remove();
        if (next === B) return answer[next];
        for (const el of points[next]) {
            if (!answer[el]) {
                answer[el] = answer[next] + 1;
                q.add(el);
            }
        }
    }
    return -1;
}

console.log(bfs(A, B));
