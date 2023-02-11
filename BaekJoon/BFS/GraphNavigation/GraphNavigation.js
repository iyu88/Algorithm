const fs = require('fs');
const [nums, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function Queue () {
    this.q = {};
    this.front = this.rear = 0;
    
    this.size = () => {
        if (this.q[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }
    
    this.add = value => {
        if (this.size() === 0) this.q['0'] = value;
        else this.q[++this.rear] = value;
    }
    
    this.remove = () => {
        if (this.size() === 0) return undefined;
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value;
    }
}

const [N, M] = nums.split(' ').map(Number);
const [C, ...plans] = input.splice(M);
const queue = new Queue();
const visited = Array.from(Array(+C), () => Array(N+1).fill(-1));
const points = Array.from(Array(N+1), () => []);
input.forEach(road => {
    const [from, to] = road.split(' ').map(Number);
    points[from].push(to);
    points[to].push(from);
});

const bfs = (index, start_city = 1) => {
    visited[index][start_city] = 0;
    queue.add([start_city, 0]);
    while (queue.size()) {
        const [current_city, route_count] = queue.remove();
        for (const next_city of points[current_city]) {
            if (visited[index][next_city] === -1) {
                visited[index][next_city] = route_count + 1;
                queue.add([next_city, route_count + 1]);
            }
        }
    }
}

const addNewRoad = (from, to) => {
    points[from].push(to);
    points[to].push(from);
}

const removeTheRoad = (from, to) => {
    points[from] = points[from].filter(el => el !== to);
    points[to] = points[to].filter(el => el !== from);
}

const action_map = {
    1: addNewRoad,
    2: removeTheRoad,
}

plans.forEach((plan, index) => {
    const [p, from, to] = plan.split(' ').map(Number);
    action_map[p](from, to);
    bfs(index);
})

console.log(visited.map(line => line.slice(1).join(' ')).join('\n'));
