function solution(left, right) {
    let answer = 0;
    for ( let j = left ; j <= right; j++) {
        let temp  = [];
        for ( let i = 1 ; i <= j ; i++) {
            if ( j % i === 0 ) {
                temp.push(i);
            }
        }
        temp.length % 2 === 0 ? answer += j : answer -= j;
    }
    return answer;
}
