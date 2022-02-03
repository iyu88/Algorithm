function solution(arr, divisor) {
    let answer = [];
    arr.forEach(el => {
        if ( el % divisor === 0 ) {
            answer.push(el);
        }
    });
    if (answer.length === 0) {
        answer.push(-1);
    }
    answer.sort((a,b) => a-b);
    return answer;
}
