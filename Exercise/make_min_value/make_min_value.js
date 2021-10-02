function solution(A,B){
    A = A.sort((a,b) => Number(b) - Number(a));
    B = B.sort((a,b) => Number(a) - Number(b)).reverse();
    return A.map((el, i) => el * B[B.length - 1 - i]).reduce((a,b) => a + b);
}
