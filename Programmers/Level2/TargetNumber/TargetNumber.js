function solution(numbers, target) {
    let answer = 0;
    const dfs = (value, index) => {
        if (index === numbers.length - 1 && value === target) {
            answer++;
            return;
        }
        if (index + 1 <= numbers.length - 1) {
            dfs(value + numbers[index + 1], index + 1);
            dfs(value - numbers[index + 1], index + 1);
        }
    }

    dfs(numbers[0], 0);
    dfs(numbers[0] * -1, 0)
    return answer;
}