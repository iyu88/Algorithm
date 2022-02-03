function solution(s) {
    let answer = [];
    let answer2 = [];
    s.split(' ').forEach(word => {
        word.split('').forEach((el,index) => {
        answer.push(index % 2 === 0 ? el.toUpperCase() : el.toLowerCase());
        })
    answer2.push(answer.join(''));
    answer = [];
    });
    return answer2.join(' ');
}
