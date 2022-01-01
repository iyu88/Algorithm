function solution(skill, trees) {
    let answer = 0;
    trees.forEach(el => check(el, skill) ? answer++ : answer = answer);
    return answer;
}

function check (el, skill) {
    let isCheck = 0;
    let temp = el.split('').map(el2 => {
        if ( skill.includes(el2) ) {
            return el2;
        } else {
            return '';
        }
    }).join('').split('').forEach((el3, i) => {
        if ( isCheck !== 0 ) {
            return isCheck;
        } else if ( skill.split('')[i] !== el3 ) {
            return isCheck++;
        }
    });
    
    return !isCheck;
}
