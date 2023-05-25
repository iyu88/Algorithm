const fs = require('fs');
const str = fs.readFileSync('/dev/stdin').toString().trim().split('');

const recursive = (temp, stack) => {
    while (stack.length) {
        const last = stack.pop();
        if (last === ')') {
            temp += recursive(0, stack);
        } else if (last === '(') {
            const repeatation = stack.pop();
            temp *= repeatation;
            return temp;
        } else {
            temp += 1;
        }
    }
    return temp;
}

console.log(recursive(0, str));
