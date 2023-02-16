const fs = require('fs');
const [size, ...$map] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const Queue = function () {
    if (new.target === undefined) {
        return new Queue();
    }
    
    this.q = {};
    this.front = this.rear = 0;
    
    this.size = () => {
        if (this.q[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }
    
    this.add = value => {
        if (!this.size()) this.q['0'] = value;
        else this.q[++this.rear] = value;
    }
    
    this.remove = () => {
        if (!this.size()) return null;
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value;
    }
}

const [N, M] = size;
const visited = Array.from(Array(N), () => Array(M).fill(false));
const queue = Queue();

const increaseIndex = (origin_index, move_counts, max) => {
    const calced_index = origin_index + move_counts;
    return calced_index >= max 
        ? max - 1
        : calced_index;
}

const bfs = (start_y, start_x) => {
    visited[start_y][start_x] = true;
    queue.add([start_y, start_x, 0]);
    while (queue.size()) {
        const [current_y, current_x, move_time] = queue.remove();
        
        if (current_y === N-1 && current_x === M-1) return move_time;
        
        const current_booster = $map[current_y][current_x];
        const next_right = increaseIndex(current_x, current_booster, M);
        const next_down = increaseIndex(current_y, current_booster, N);
        
        for (let x = current_x + 1; x <= next_right; x++) {
            if (!visited[current_y][x]) {
                visited[current_y][x] = true;
                queue.add([current_y, x, move_time + 1]);
            }
        }
        
        for (let y = current_y + 1; y <= next_down; y++) {
            if (!visited[y][current_x]) {
                visited[y][current_x] = true;
                queue.add([y, current_x, move_time + 1]);
            }
        }
    }
}

console.log(bfs(0, 0));
