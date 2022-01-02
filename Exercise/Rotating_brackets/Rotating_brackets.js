function solution(s) {
    var answer = 0;
    for ( let i = 0 ; i < s.length; i++ ) {
        isAlright(s) ? answer++ : answer = answer; 
        s = s.split('');
        let first = s.shift();
        s.push(first);
        s = s.join('');
    }
    return answer;
}

function isAlright (s) {
    let stack = []
    s.split('').forEach(el => {
        let length = stack.length-1;
        if ( el === ')') {
            stack[length] === '(' ? stack.pop() : stack.push(el);
        } else if ( el === '}') {
            stack[length] === '{' ? stack.pop() : stack.push(el);
        } else if ( el === ']') {
            stack[length] === '[' ? stack.pop() : stack.push(el);
        } else {
            stack.push(el);
        }
    });
    return !stack.length;
}
