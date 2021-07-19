function solution(lottos, win_nums) {
    let answer = [];
    let temp = [];
    win_nums.forEach(el => {
        lottos.includes(el) ? temp.push(el) : temp = temp;
    })
    const worst =  temp.length === 0 ? 6 : 7 - temp.length ;
    const best =  7 - (temp.length + lottos.filter(el => el === 0).length); 
    return [best === 7 ? 6 : best, worst];
}
