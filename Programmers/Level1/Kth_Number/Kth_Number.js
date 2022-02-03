function solution(array, commands) {
    let answer = [];
    commands.forEach(command => {
        const sliced = array.slice(command[0]-1, command[1]);
        answer.push(sliced.sort((a,b) => a-b)[command[2]-1]);
    });
    return answer;
}
