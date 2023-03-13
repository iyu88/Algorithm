const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input; 

rl.on('line', function(line) {
    input = line;
    rl.close();
}).on("close", function() {
    let answer;
    let index = 0;
    const deck = {
        'P': {},
        'K': {},
        'H': {},
        'T': {},
    }

    while (index < input.length) {
        const card = input.slice(index, index + 1);
        const number = Number(input.slice(index + 1, index + 3));
        if (deck[card][number] === undefined) deck[card][number] = 1;
        else {
            answer = 'GRESKA';
            break;
        }
        index += 3;
    }

    if (answer === undefined) {
        console.log(Object.keys(deck).map(k => 13 - Object.values(deck[k]).length).join(' '));
    } else {
        console.log(answer);
    }
    process.exit();
});
