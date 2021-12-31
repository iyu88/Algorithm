function solution(s) {
    let answer = [0, 0];
    while ( s !== "1" ) {
        answer[0]++;
        while ( s.includes(0) ) {
        s = s.replace('0', '');
        answer[1]++;
        }
        s = parseInt(s.length.toString(2), 2).toString(2);
    }
    return answer;
}
