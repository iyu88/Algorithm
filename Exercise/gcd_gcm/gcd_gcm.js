function solution(n, m) {
    let max_array = new Array();
    let min = m;
    let flag = true;
    for ( let i = 1; i <= m ; i++ ) {
        if ( n % i === 0 && m % i === 0 ) {
            max_array.push(i);
        }
    }
    while (flag) {
        if ( min % n === 0 && min % m === 0) {
            flag = false;
        } else {
            min++;
        }
    }
    
    return [max_array[max_array.length - 1], min];
}
