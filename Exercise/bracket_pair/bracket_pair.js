function solution(s){
    let a = 0;
    for (let i = 0; i < s.length; i++) {
        s[i] === '(' ? a++ : a--;
        if (a < 0) {
            break; 
        }
    }
    return a === 0 ? true : false;
}
