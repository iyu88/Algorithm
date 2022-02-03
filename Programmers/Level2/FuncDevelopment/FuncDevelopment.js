function solution(progresses, speeds) {
    let answer = [];
    let count = 0;
    progresses.reverse();
    speeds.reverse();
    while ( progresses.length !== 0 ) {
        progresses = progresses.map((el, index) => {
            if ( el < 100 ) {
                return el + speeds[index];
            }
            return el;
        });
        while ( progresses[progresses.length-1] >= 100 ) {
            progresses.pop();
            count++;
        }
        if ( count > 0 ) {
            answer.push(count);
            count = 0;
        }
    };
    return answer;
}
