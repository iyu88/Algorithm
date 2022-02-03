function solution(d, budget) {
    var answer = 0;
    d.sort((a,b) => a-b).forEach(el => {
        budget -= el;
        if ( budget >= 0) {
            answer++;
        }
    })
    return answer;
}
