function solution(people, limit) {
    let answer = 0;
    let index = 0;
    people.sort((a,b) => b-a);
    let length = people.length;
    let max = people[0];
    let min = people[length - 1];
    for (let i = 0 ; i < length; i++) {
        if (people.length !== 0) {
            let calc = limit - people[people.length - 1];
            if (calc < min) {
                people.pop();
                answer++;
            } else {
                // let index = people.findIndex(el => calc - el >= 0);
                for ( ; index < length; index++) {
                    if (calc - people[index] >= 0) {
                        break;
                    }
                }
                if ((index !== -1) && (index !== people.length-1)) {
                    people.splice(index, 1);
                    people.pop();
                    answer++;
                } else {
                    people.pop();
                    answer++;
                }
            }
        }else {
            break;
        }
    }
    return answer;
}
