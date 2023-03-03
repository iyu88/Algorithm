const fs = require('fs');
let [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value = '') {
    this.value = value;
    this.end = false;
    this.children = {};
}

const Trie = function () {
    this.root = new Node();
    
    this.insert = value => {
        let currentNode = this.root;
        
        for (let i = 0 ; i < value.length; i++) {
            const currentChar = value[i];
            
            if (currentNode.children[currentChar] === undefined) {
                currentNode.children[currentChar] = new Node(currentNode.vlaue + currentChar);
            }
            
            currentNode = currentNode.children[currentChar];
        }
        
        currentNode.end = true;
    }
    
    this.search = value => {
        let currentNode = this.root;
        
        for (let i = 0 ; i < value.length; i++) {
            const currentChar = value[i];
            
            if (currentNode.children[currentChar]) {
                currentNode = currentNode.children[currentChar];
            } else {
                return '';
            }
        }
        
        return currentNode.value;
    }
}

const [N, _] = nums.split(' ').map(Number);
let trie = new Trie();

arr.slice(0, N).forEach(word => trie.insert(word));

console.log(arr.slice(N).filter(word => trie.search(word)).length);
