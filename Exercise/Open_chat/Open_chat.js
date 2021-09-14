function solution(record) {
    let answer = [];
    let ids = {};
    record.map(r => {
        if (r.split(' ')[0] === 'Leave') {
            answer.push(r.split(' ')[1] + " 님이 나갔습니다.")
        } else if (r.split(' ')[0] === 'Enter') {
            ids[r.split(' ')[1]] = r.split(' ')[2];
            answer.push(r.split(' ')[1] + " 님이 들어왔습니다.")
        } else {
            ids[r.split(' ')[1]] = r.split(' ')[2];
        }
    });
    return answer.map(el => ids[el.split(' ')[0]] + el.split(' ')[1] + " " + el.split(' ')[2]);
}

