function solution(a, b) {
    var answer = '';
    const day = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];
    let date = 0;
    for(let i = 0; i < a; i ++) {
        if ( i === 0 ) {
            date += 0;
        } else if ( i === 2 ) {
            date += 29;
        } else if ( i <= 7 & i % 2 !== 0 || i >= 8 & i % 2 === 0 ) { 
            date += 31; 
        } else {
            date += 30;
        }
    };
    date += b;
    console.log(date);
    answer = day[date % 7];
    return answer;
}
