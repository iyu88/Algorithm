function solution(begin, target, words) {
    if (!words.includes(target)) return 0;

    let answer;
    let visited = Array(words.length).fill(Infinity);
    let characters = words.reduce((acc, cur) => {
        cur.split('').forEach((el, i) => {
            if (acc[i] === undefined) acc[i] = [el];
            else if (!acc[i].includes(el)) {
                acc[i].push(el);
            }
        });
        return acc;
        }, {});

    const bfs = () => {
        let q = new queue();
        q.add([begin, 0]);
        while (q.size()) {
            let [word, count] = q.remove();
            if (word === target) {
                answer = count;
                return;
            }
            for (let k = 0; k < target.length; k++) {
                if (word[k] !== target[k]) {
                    for (const element of characters[k]) {
                        let newWord = word.slice(0, k) + element + word.slice(k+1);
                        let index = words.indexOf(newWord);
                        if (index !== -1 && visited[index] > count + 1) {
                            visited[index] = count + 1;
                            q.add([newWord, count + 1]);
                        }
                    }
                }
            }
        }
    }

    bfs();

    return answer;
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