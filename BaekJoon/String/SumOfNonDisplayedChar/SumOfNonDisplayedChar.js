const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', function (line) {
  input.push(line)
})
  .on('close', function () {
    const [num, ...arr] = input;
    console.log(arr.map(el => {
        const counts = {};
        el.split('').forEach(el2 => counts[el2] ??= 1);
        return 2015 - Object.keys(counts).reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
    }).join('\n'));
    process.exit();
});
