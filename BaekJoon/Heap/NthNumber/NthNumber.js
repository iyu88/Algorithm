const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Heap {
    constructor () {
        this.h = [];
    }
    
    swap = (i, j) => {
        const temp = this.h[i];
        this.h[i] = this.h[j];
        this.h[j] = temp;
    }
    
    parentIndex = index => Math.floor((index - 1) / 2);

    leftIndex = index => index * 2 + 1;

    rightIndex = index => index * 2 + 2;

    parent = index => this.h[this.parentIndex(index)];

    left = index => this.h[this.leftIndex(index)];

    right = index => this.h[this.rightIndex(index)];

    peek = () => this.h[0];

    size = () => this.h.length;
}

class minHeap extends Heap{
    
    push = value => {
        this.h.push(value);
        this.bubbleUp();
    }
    
    bubbleUp = () => {
        let index = this.h.length - 1;
        while (this.parent(index) && this.h[index] < this.parent(index)) {
            this.swap(index, this.parentIndex(index));
            index = this.parentIndex(index);
        }
    }
    
    pop = () => {
        if (this.h.length === 0) return;
        const value = this.h[0];
        this.swap(0, this.h.length-1);
        this.h.pop();
        this.bubbleDown();
        return value;
    }
    
    bubbleDown = () => {
        let index = 0;
        
        while (this.left(index) && (this.left(index) < this.h[index] || this.right(index) < this.h[index])) {
            let small = this.leftIndex(index);
            if (this.right(index) && this.right(index) < this.h[small]) small = this.rightIndex(index);
            this.swap(index, small);
            index = small;
        }
    }
}

let N = 0;
let count = -1;
const heap = new minHeap();

rl.on('line', (line) => {
  if (count === -1) {
      count = +line;
      N = count;
      return;
  }
  line.split(' ').forEach(el2 => {
      heap.push(Number(el2));
      if (heap.size() > N) heap.pop();
  });
  count--;
  if (count === 0) rl.close();
})
  .on('close', () => {
    console.log(heap.peek());
    process.exit();
});
