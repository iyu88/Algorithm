const fs = require("fs");
let [num, $in, $post] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let N = +num;
$in = $in.split(" ").map((el) => +el);
$post = $post.split(" ").map((el) => +el);
let $pre = [];

const dNc = (in_start, in_end, post_start, post_end) => {
  if (in_start > in_end || post_start > post_end) return;

  let root = $post[post_end];
  $pre.push(root);

  let rootIndex = $in.indexOf(root);
  let left = rootIndex - in_start;

  dNc(in_start, rootIndex - 1, post_start, post_start + left - 1);
  dNc(rootIndex + 1, in_end, post_start + left, post_end - 1);
};

dNc(0, N - 1, 0, N - 1);

console.log($pre.join(" "));
