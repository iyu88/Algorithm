function solution(participant, completion) {
    let answer = '';
    participant.sort();
    completion.sort();
    for (let i in participant) {
        if (participant[i] !== completion[i]){
            answer = participant[i];
            break;
        }
    }
    return answer;
}
