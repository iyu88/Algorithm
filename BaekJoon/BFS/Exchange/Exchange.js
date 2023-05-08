const fs = require('fs');
const [N, K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const Queue = function () {
    this.q = {};
    this.front = this.rear = this.length = 0;
    
    this.add = value => {
        if (this.length === 0) this.q[this.rear] = value;
        else this.q[++this.rear] = value;
        this.length++;
    }
    
    this.remove = () => {
        if (this.length === 0) return null;
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front !== this.rear) this.front++;
        this.length--;
        return value;
    }
}

const getSubs = (arr, target) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (target === 1) {
            result.push([arr[i]]);
        } else {
            const tempSubs = getSubs(arr.slice(i+1), target - 1);
            tempSubs.forEach(el => result.push([arr[i], ...el]));
        }
    }
    
    return result;
}

const swap = (str, i, j) => {
    let swapped = '';
    for (let index = 0 ; index < str.length ; index++) {
        if (index === i) swapped += str[j];
        else if (index === j) swapped += str[i];
        else swapped += str[index];
    }
    
    return swapped;
}

const M = String(N).length;
const dummy = Array(M).fill(0).map((el, idx) => el + idx);
const sets = getSubs(dummy, 2);

const bfs = (start, repeatation) => {
    const queue = new Queue();
    let answer = -1;
    
    queue.add(start);
    
    for (let k = 0; k <= repeatation; k++) {
        const visited = {};
        let size = queue.length;
        
        while (size--) {
            const current = queue.remove();
            
            if (k === repeatation) {
                answer = Math.max(answer, Number(current));
                continue;
            }
        
            for (let i = 0 ; i < sets.length ; i++) {
                const [a, b] = sets[i];
                const swapped = swap(current, a, b);
                if (swapped[0] === '0') continue;
                if (visited[swapped] === undefined) {
                    visited[swapped] = true;
                    queue.add(swapped);
                }
            }
        }
    }
    
    return answer;
}

console.log(bfs(String(N), K));
