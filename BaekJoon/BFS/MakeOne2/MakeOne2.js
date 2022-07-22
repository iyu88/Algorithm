const fs = require('fs');
let N = fs.readFileSync('/dev/stdin').toString() * 1;

const queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    
    this.size = () => {
        if (this.q[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }
    
    this.add = (num) => {
        if (!this.size()) this.q['0'] = num;
        else this.q[++this.rear] = num;
    }
    
    this.remove = () => {
        let v = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return v;
    }
}

let answer;
let visited = Array(N+1).fill(false);
let $q = new queue(); 

visited[N] = true;
$q.add([N, [N]]);

while ($q.size()) {
    let [next, arr] = $q.remove();
    if (next === 1) {
        answer = arr;
        break;
    }
    let three = Math.floor(next / 3);
    let two = Math.floor(next / 2);
    let one = next - 1;
    if (next % 3 === 0 && !visited[three]) {
        visited[three] = true;
        $q.add([three, [...arr, three]]);
    }
    if (next % 2 === 0 && !visited[two]) {
        visited[two] = true;
        $q.add([two, [...arr, two]]);
    }
    if (!visited[one]) {
        visited[one] = true;
        $q.add([one, [...arr, one]]);
    }
}

console.log(answer.length - 1);
console.log(answer.join(' '));