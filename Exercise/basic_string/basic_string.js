function solution(s) {
    let answer = 0;
    const num_dict = "1234567890";
    if ( s.length === 4 || s.length === 6 ) {
        for ( let i = 0 ; i < s.length ; i++ ) {
            num_dict.includes(s[i]) ? (answer = answer) : answer++;
        }
    } else {
        answer++;
    }
    return answer === 0 ? true : false;
}
