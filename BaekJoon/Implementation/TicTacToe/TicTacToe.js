const fs = require('fs');
const questions = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const checkWinCount = (str, target) => {
    let count = 0;
    
    let rowFlag = false;
    for (let i = 0 ; i < 9 ; i+=3) {
        let flag = true;
        for (let j = i ; j < i + 3 ; j++) {
            if (str[j] !== target) {
                flag = false;
                break;
            }
        }
        if (flag) {
            count++; 
            if (rowFlag) return null;
            rowFlag = true;
        }
    }
    
    let columnFlag = false;
    for (let i = 0 ; i < 3 ; i++) {
        let flag = true;
        for (let j = i ; j < 9 ; j+=3) {
            if (str[j] !== target) {
                flag = false;
                break;
            }
        }
        if (flag) {
            count++;
            if (columnFlag) return null;
            columnFlag = true;
        }
    }
    
    if (str[4] === target) {
        if (str[0] === target && str[8] === target) count++;
        if (str[2] === target && str[6] === target) count++;
    }
    
    return count;
}

const answer = questions.slice(0, questions.length-1).map(question => {
    const counts = [0, 0];
    
    question.split('').forEach(el => {
        if (el === 'X') counts[0]++;
        if (el === 'O') counts[1]++;
    });
    
    if (counts[0] - counts[1] === 0 || counts[0] - counts[1] === 1);
    else return 'invalid';
    
    const countX = checkWinCount(question, 'X');
    if (countX === null) return 'invalid';
    const countO = checkWinCount(question, 'O');
    if (countO === null) return 'invalid';
    
    if (countO && counts[0] > counts[1]) return 'invalid';
    
    if (countX && (countO || counts[0] === counts[1])) return 'invalid';
    
    if (countX === 0 && countO === 0) {
        for (let i = 0 ; i < 9 ; i++) {
            if (question[i] === '.') return 'invalid';
        }
    }
    
    return 'valid';
});

console.log(answer.join('\n'));
