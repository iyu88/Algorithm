function solution(N, stages) {
    let answer = {};
    for ( let i = 1; i <= N; i++) {
        const filtered = stages.filter(el => el === i);
        const ratio  = filtered.length / stages.length; 
        answer[i] = ratio;
        stages = stages.filter(el => el !== i);
    }
    const final = Object.keys(answer).sort((a,b) => answer[b] - answer[a]);
    return final.map(el => Number(el));
}
