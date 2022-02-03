function solution(n, arr1, arr2) {
    let answer = [];
    let converted1 = [];
    let converted2 = [];
    arr1.forEach(el => {
        let temp = [];
        for ( let i = n-1; i >= 0; i--) {
            if ( 2 ** i <= el) {
                temp.push(1);
                el -= 2 ** i;
            } else {
                temp.push(0);
            }
        }
        converted1.push(temp);
    });
    arr2.forEach(el => {
        let temp = [];
        for ( let i = n-1; i >= 0; i--) {
            if ( 2 ** i <= el) {
                temp.push(1);
                el -= 2 ** i;
            } else {
                temp.push(0);
            }
        }
        converted2.push(temp);
    });
    
    for ( let i = 0; i < n; i++ ) {
        let temp = "";
        for ( let j = 0; j < n; j++ ) {
            if (converted1[i][j] === 0 && converted2[i][j] === 0) {
                temp += " ";
            } else {
                temp += "#";
            }
        };
        answer.push(temp);
    };
    return answer;
}
