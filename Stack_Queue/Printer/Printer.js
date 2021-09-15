function solution(p, l) { 
    let arr = Array(p.length).fill(0).map((a, b) => b);
    let i = 0;
    let max = Math.max(...p);
    
    while ( arr.indexOf(l) >= 0 ? true : false ) {
        if ( p[0] !== max ) {
             p.push(p.shift());
             arr.push(arr.shift());
        } else  {
            p.shift();
            arr.shift();
            max = Math.max(...p);
            i++;
        }
    }
    return i;
}
