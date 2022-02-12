const fs = require("fs");
let arr = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => +el);

const Tree = function (root) {
  this.value = root;
  this.left = null;
  this.right = null;

  this.push = (num) => {
    if (num < this.value) {
      if (this.left === null) {
        this.left = new Tree(num);
      } else {
        this.left.push(num);
      }
    } else if (num > this.value) {
      if (this.right === null) {
        this.right = new Tree(num);
      } else {
        this.right.push(num);
      }
    }
  };

  this.print = () => {
    console.log(this.value);
  };

  this.pop = () => {
    if (this.left !== null) {
      this.left.pop();
    }
    if (this.right !== null) {
      this.right.pop();
    }
    this.print();
  };
};

let tree = new Tree(arr.shift());

arr.forEach((el) => {
  tree.push(el);
});
tree.pop();
