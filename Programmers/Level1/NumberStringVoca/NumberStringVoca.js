function solution(s) {
    const dict = {
        "zero" : 0,
        "one" : 1,
        "two" : 2,
        "three" : 3,
        "four" : 4,
        "five": 5,
        "six" : 6,
        "seven" : 7,
        "eight" : 8,
        "nine" : 9,
    };
    let answer = [];
    let number = [];
    let isNumberStart = false;
    for (let i = 0; i < s.length; i++) {
        if ( Number.isInteger(Number(s[i])) ) {
            isNumberStart = false;
            answer.push(s[i]);
        } else {
            isNumberStart = true;
            number.push(s[i]);
        }
        if ( number.length > 0 ) {
            let str_to_num = number.join('');
            if ( dict[str_to_num] === 0 ) {
                answer.push(dict[str_to_num]);
                number = [];
            } else if ( dict[str_to_num] ) {
                answer.push(dict[str_to_num]);
                number = [];
            }
        }
    }
    return Number(answer.join(''));
}
