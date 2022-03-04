const fs = require("fs");
let [num, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

while (arr.length) {
  let N = Number(arr.shift());
  let $pre = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  let $in = arr
    .shift()
    .split(" ")
    .map((el) => +el);
  let $post = [];
  const dNc = ($pre_start, $pre_end, $in_start, $in_end) => {
    if ($pre_start > $pre_end || $in_start > $in_end) return;

    let rootIndex = $in.indexOf($pre[$pre_start]);
    let count = rootIndex - $in_start;

    dNc($pre_start + 1, $pre_start + count, $in_start, rootIndex - 1);
    dNc($pre_start + count + 1, $pre_end, rootIndex + 1, $in_end);

    $post.push($in[rootIndex]);
  };

  dNc(0, N - 1, 0, N - 1);

  console.log($post.join(" "));
}
