function solution(b, w, t) {
    let arr = [];
    let count = [];
    let s = 0;
    
    while ( arr.length !== 0 || t.length !== 0) {
        s++;
        let sum = arr.reduce((a,b) => a+b, 0);
        if ( sum + t[0] <= w ) {
            arr.push(t.shift());
            count.push(0);
        }
        count = count.map(el => el + 1);
        if (count[0] === b ) {
            arr.shift();
            count.shift();
        }
    }
    return s+1;
}
