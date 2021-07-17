function solution(nums) {
    let answer = [];
    nums.forEach(num => {
        if (!answer.includes(num)) {
            answer.push(num);
        }
    });
    return answer.length > nums.length / 2 ? nums.length / 2 : answer.length;
}
