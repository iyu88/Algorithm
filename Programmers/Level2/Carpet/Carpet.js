function solution(brown, yellow) {
    let answer = [];
    let area = brown + yellow;
    for (let i = 0; i <= area; i++) {
        if (area % i === 0) {
            if (yellow === (area - (i * 2) - (((area / i) - 2) * 2))){
                answer = [area/i, i];
                break;
            }
        }
    }
    return answer;
}
