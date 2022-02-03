function solution(n) {
    let answer = 0;
    let num = n;
    while (num !== 1) {
       if ( answer === 500 ) {
           answer = -1;
           break;
       }
       answer += 1;
       if ( num % 2 === 0 ) {
           num /= 2;
       } else {
           num = num * 3 + 1;
       }
   }
    return answer;
}
