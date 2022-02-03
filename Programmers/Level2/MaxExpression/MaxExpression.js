function solution(expression) {
    let all_sub = [];
    let all_calc = [];
    let new_exp = [];
    // 숫자가 아닌 부호만 추출 
    let answer = expression.split('').filter(el => ((+el) != el));
    // 부호를 공백으로 
    let nums = answer.map(el => expression = expression.replace(el, " "));
    nums = nums[nums.length-1].split(' ');
    // 표현식 배열로 만들기
    for ( let i = 0; i < answer.length + nums.length; i++ ) {
        i % 2 === 0 ? new_exp.push(nums[i / 2]) : new_exp.push(answer[Math.floor(i / 2)]); 
    }
    // 부호 중복 삭제 
    answer = [...new Set(answer)];
    // 부호 조합 구하기 
    let sub = getSub(answer.length, answer);
    all_sub = [...sub];
    all_sub.forEach(el => {
        let exp = [...new_exp];
        el.split('').forEach(el2 => {
           while ( exp.indexOf(el2) !== -1 ) {
               let index = exp.indexOf(el2);
               let new_exp = "(" +exp[index-1] + el2 + exp[index+1] + ")";
               exp.splice(index-1, 3, new_exp);
           }
        });
        all_calc.push(Math.abs(eval(exp.join(''))));
    });
    return Math.max(...all_calc);
}

function getSub(count, arr) {
    let answer = [];
    for (let i = 0 ; i < arr.length; i++) {
        if (count === 1) {
            answer.push(arr[i]);
        } else {
            let result = getSub(count-1, [...arr.slice(0, i), ...arr.slice(i+1)]);
            result.forEach(el => answer.push(arr[i] + el));
        }
    }
    return answer;
}
