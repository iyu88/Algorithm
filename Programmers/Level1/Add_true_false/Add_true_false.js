function solution(absolutes, signs) {
    let answer = 0;
    absolutes.forEach((d,i) => signs[i] === true ? answer += d : answer -=d);
    return answer;
}
