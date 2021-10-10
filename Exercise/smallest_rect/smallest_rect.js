function solution(sizes) {
    sizes.map(el => {
        let temp;
        if ( el [0] < el [1]) {
            temp = el[0];
            el[0] = el[1];
            el[1] = temp;
        }
        return el;
    });
    
    return Math.max(...sizes.map(el => el[0])) * Math.max(...sizes.map(el => el[1]));
}
