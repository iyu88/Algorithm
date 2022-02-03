function solution(a, b) {
    var answer = 0;
    if ( a === b ) { 
        answer = a;
    }
    if ( a > b ) {
        for ( let i = 0 ; b <= a ; b ++ ) {
            answer += b;
        }
    }
    else if ( a < b ) {
        for ( let j = 0; a <= b ; a ++ ) {
            answer += a;
        }
    }
    return answer;
}
