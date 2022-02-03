function solution(n) {
    let answer = 0;
    let temp = n; 
    while ( answer === 0 ) {
        temp++;
        // 이진수 변경 -> 1의 갯수
        let $1_n = n.toString(2).split('').filter(el => el === '1').length;
        let $1_t = temp.toString(2).split('').filter(el => el === '1').length;
        if ($1_n === $1_t) {
            answer = temp;
        }
    }
    return answer;
}
