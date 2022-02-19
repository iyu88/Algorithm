const fs = require("fs");
let [num, ...temp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const Tree = function (value) {
  this.value = value;
  this.left = null;
  this.right = null;

  this.insert = (root, left, right) => {
    if (this.value === root) {
      if (left !== ".") this.left = new Tree(left);
      if (right !== ".") this.right = new Tree(right);
    } else {
      if (this.left) this.left.insert(root, left, right);
      if (this.right) this.right.insert(root, left, right);
    }
  };

  this.preorder = () => {
    answer[0].push(this.value);
    if (this.left) this.left.preorder();
    if (this.right) this.right.preorder();
  };

  this.inorder = () => {
    if (this.left) this.left.inorder();
    answer[1].push(this.value);
    if (this.right) this.right.inorder();
  };

  this.postorder = () => {
    if (this.left) this.left.postorder();
    if (this.right) this.right.postorder();
    answer[2].push(this.value);
  };
};

let N = +num;
let answer = Array.from(Array(3), () => []);
let arr = temp.map((el) => el.split(" "));
let T;

while (arr.length) {
  let [root, left, right] = arr.shift();
  if (!T) T = new Tree(root);
  T.insert(root, left, right);
}

T.preorder();
T.inorder();
T.postorder();

console.log(answer.map((el) => el.join("")).join("\n"));
