function solution(n) {
    let answer = 1; // 자기 자신 
    for (let i = 1; i < n / 2; i++) { // 반까지만 반복 
        let sum = 0;
        let j = i;
        while (sum < n) {
            sum += j;
            sum === n ? answer++ : answer = answer;
            j++;
        }
    }
    return answer;
}
