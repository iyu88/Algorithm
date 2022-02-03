function solution(s){
    const str = s.toLowerCase();
    let p = 0;
    let y = 0; 
    for (let i = 0; i < str.length; i++) {
        if ( str[i] === 'p') {
            p += 1;
        } else if ( str[i] === 'y') {
            y += 1; 
        }
    }
    return p === y ?  true : false
}
