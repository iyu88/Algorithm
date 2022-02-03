function solution(a, b) {
    let answer = 0;
    a.forEach((el, index) => answer += el * b[index])
    return answer;
}
