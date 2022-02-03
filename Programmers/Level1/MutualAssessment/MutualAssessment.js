function solution(scores) {
    let answers = [];
    for ( let i = 0; i < scores.length; i++ ) {
        let ps = [];
        for ( let j = 0 ; j < scores[0].length; j++ ) {
            ps.push(scores[j][i]);
        }
        let min = Math.min(...ps);
        let max = Math.max(...ps);
        let filtered = [];
        if ( scores[i][i] === min ) {
            filtered = ps.filter(el => el === min);
        } else if ( scores[i][i] === max ) {
            filtered = ps.filter(el => el === max);
        }
        filtered.length === 1 ? ps.splice(i, 1) : ps = ps;
        let total = ps.reduce((prev, curr) => prev + curr, 0);
        let ts = total / ps.length;
        
        if ( ts >= 90 ) {
            answers.push("A");
        } else if ( ts >= 80 ) {
            answers.push("B");
        } else if ( ts >= 70 ) {
            answers.push("C");
        } else if ( ts >= 50 ) {
            answers.push("D");
        } else {
             answers.push("F");
        }
    }
    return answers.join('');
}
