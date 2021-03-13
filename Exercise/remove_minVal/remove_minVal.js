function solution(arr) {
    let answer = [];
    if ( arr.length === 1) {
        answer.push(-1)
    }
    answer = arr.filter(el => el !== arr.reduce((prev,curr) => prev > curr ? curr : prev));
    if ( answer.length === 0 ) {
        answer.push(-1);
    }
    return answer;
}
