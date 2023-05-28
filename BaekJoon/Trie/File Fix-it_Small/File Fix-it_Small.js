const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value = '') {
    this.value = value;
    this.end = false;
    this.children = {};
}

const Trie = function () {
    this.root = new Node();
    
    this.insert = (value) => {
        let currentNode = this.root;
        let count = 0;
        
        for (let i = 0 ; i < value.length ; i++) {
            const currentChar = value[i];
            
            if (currentNode.children[currentChar] === undefined) {
                currentNode.children[currentChar] = new Node(currentNode.value + currentChar);
                count++;
            }
            
            currentNode = currentNode.children[currentChar];
        }
        
        currentNode.end = true;
        return count;
    }
    
}

const answer = [];
let index = 1;

while (index < inputs.length) {
    const [N, M] = inputs[index++].split(' ').map(Number);
    const T = new Trie();
    
    const existed = inputs.slice(index, index + N);
    index += N;
    const created = inputs.slice(index, index + M);
    index += M;
    
    existed.forEach(e => {
        const path = e.split('/').slice(1);
        T.insert(path);
    });
    
    const sum = created.map(c => {
        const path = c.split('/').slice(1);
        return T.insert(path);
    }).reduce((acc, cur) => acc + cur, 0);
    
    answer.push(sum);
}

console.log(answer.map((el, idx) => `Case #${idx+1}: ${el}`).join('\n'));
