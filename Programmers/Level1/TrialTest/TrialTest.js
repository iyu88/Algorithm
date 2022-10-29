function solution(answers) {
    const selection = {"1": [1,2,3,4,5], "2": [2,1,2,3,2,4,2,5], "3": [3,3,1,1,2,2,4,4,5,5]};
    const answer = Array(3).fill(1).reduce((acc, cur, i) => ({...acc, [cur + i] : 0}), {});

    answers.forEach((el, index) => {
        Object.keys(answer).forEach(key => {
            if ((index >= selection[key].length && el === selection[key][index % selection[key].length]) || (index < selection[key].length && el === selection[key][index])) answer[key]++;
        }
        )
    });

    const max = Math.max(...Object.values(answer));
    const result = [];

    if (answer[1] === max) result.push(1);
    if (answer[2] === max) result.push(2);
    if (answer[3] === max) result.push(3);

    return result;
}