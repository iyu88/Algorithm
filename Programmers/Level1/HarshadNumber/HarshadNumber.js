function solution(x) {
    let answer = 0;
    x.toString().split('').map(el => answer += Number(el));
    return x % answer === 0 ? true : false;
}
