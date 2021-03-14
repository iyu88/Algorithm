function solution(ph) {
    return "*".repeat(ph.length - 4).concat(ph.split('').splice(-4).join(''));
}
