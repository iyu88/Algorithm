const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
    input.push(line);
})
  .on('close', () => {
    const [num, ...arr] = input;
    const N = +num;
    const increasing = arr.slice().sort();

    const checkOrder = (arr, target) => {
        let isOrdered = true;    
        for (let i = 0 ; i < N ; i++) {
            if (arr[i] !== target[i]) {
                isOrdered = false;
                break;
            }
        }
        return isOrdered;
    }

    if (checkOrder(arr, increasing)) {
        console.log("INCREASING");
    } else {
        const decreasing = increasing.reverse();
        if (checkOrder(arr, decreasing)) console.log("DECREASING")
        else console.log("NEITHER");
    }
    process.exit();
});
