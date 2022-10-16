function solution(maps) {
    let N = maps.length;
    let M = maps[0].length;
    let answer;
    let visited = Array(N).fill(null).map(el => Array(M).fill(Infinity));
    let dy = [-1, 0, 1, 0];
    let dx = [0, -1, 0, 1];

    const bfs = () => {
        visited[0][0] = 1;
        let q = new queue();
        q.add([0, 0, 1]);
        while (q.size()) {
            let [y, x, count] = q.remove();
            if (y === N-1 && x === M-1) {
                answer = count;
                return;
            }
            for (let k = 0 ; k < 4 ; k++) {
                let dyy = dy[k] + y;
                let dxx = dx[k] + x;
                if (dyy < 0 || dyy >= N || dxx < 0 || dxx >= M) continue;
                if (!maps[dyy][dxx]) continue;
                if (visited[dyy][dxx] > count + 1) {
                    visited[dyy][dxx] = count + 1;
                    q.add([dyy, dxx, count + 1]);
                }
            }
        }
    }

    bfs();

    return answer === undefined ? -1 : answer;
}

function queue () {
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