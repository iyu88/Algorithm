const fs = require('fs');
const [A, B, N, M] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

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

const bfs = (start) => {
    const q = new queue();
    const answer = {};
    answer[start] = 0;
    q.add(start);
    
    while (q.size()) {
        const next = q.remove();
        
        [next + 1, next - 1, next + A, next - A, next + B, next - B, next * A, next * B].forEach(el => {
            if ((el > 0 && el <= 100000) && (answer[el] === undefined || answer[el] > (answer[next] === undefined ? 0 : answer[next] + 1))) {
                answer[el] = answer[next] + 1;
                q.add(el);
            }
        });
        
        if (answer[M]) return answer[M];
    }
}

console.log(bfs(N));
