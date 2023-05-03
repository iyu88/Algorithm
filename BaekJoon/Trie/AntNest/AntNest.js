const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value = '') {
    this.value = value;
    this.end = false;
    this.children = {};
}

const Trie = function () {
    this.root = new Node();
    
    this.insert = value => {
        let currentNode = this.root;
        
        for (let i = 0 ; i < value.length ; i++) {
            const currentWord = value[i];
            
            if (currentNode.children[currentWord] === undefined) {
                currentNode.children[currentWord] = new Node(currentWord);
            }
            
            currentNode = currentNode.children[currentWord];
        }
        
        currentNode.end = true;
    }
    
    this.totalSearch = (level, node) => {
        const currentNode = node ?? this.root;
        const sortedKey = Object.keys(currentNode.children).sort();
        const result = [];
        
        for (const key of sortedKey) {
            result.push('--'.repeat(level) + key);
            result.push(...this.totalSearch(level + 1, currentNode.children[key]).flat());
        }
        
        return result;
    }
}

const N = +num;
const T = new Trie();

inputs.forEach(el => {
    const [c, ...words] = el.split(' ');
    T.insert(words);
});

console.log(T.totalSearch(0).join('\n'));
