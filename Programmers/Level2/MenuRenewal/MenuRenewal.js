function solution(orders, course) {
    let answer = [];
    course.forEach(el => {
        // 새로운 오브젝트 
        let temp = {};
        orders.forEach(el2 => {
            // 순열과 조합
            let result = getSub(el, el2);
            // answer.push(result);
            result.forEach(el3 => {
                // 정렬하고 
                el3 = el3.split('').sort();
                el3 = el3.join('');
                // 있는지 체크하고 
                if (temp.hasOwnProperty(el3)) {
                    // 값을 증가시키거나 
                    temp[el3]++;
                } else {
                    // 오브젝트에 추가하거나
                    temp[el3] = 1;
                }
            });
        });
        // 키값의 최대값 
        let max_arr = Object.keys(temp).map(el4 => temp[el4]);
        let max = Math.max(...max_arr);
        // 키의 값이 2 이상일 때
        let filtered = Object.keys(temp).filter(el5 => temp[el5] === max && temp[el5] > 1);
        // 오브젝트 키값을 답에 추가
        answer.push(...filtered);
    })
    return answer.sort();
}

function getSub(el, el2) {
    let answer = [];
    for (let i = 0 ; i < el2.length; i++) {
        if (el === 1) {
            answer.push(el2[i]);
        } else {
            let result = getSub(el-1, [...el2.slice(i+1)]);
            result.forEach(el3 => answer.push(el2[i] + el3));
        }
    }
    return [...new Set(answer)];
}
