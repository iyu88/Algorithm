function solution(genres, plays) {
    let answer = [];
    let obj = {};
    genres.forEach((el, i) => {
        if (obj[el] === undefined) {
            obj[el] = [plays[i], { [i]: plays[i]}];
        } else {
            let [sum, playObj] = obj[el];
            obj[el] = [sum + plays[i], {...playObj, [i]: plays[i]}];
        }
    });
    let sorted = Object.values(obj).sort((a, b) => b[0] - a[0]);
    sorted.forEach(el => {
        let playSorted = Object.keys(el[1]).sort((a, b) => el[1][b] - el[1][a]);
        if (playSorted.length === 1) {
            answer.push(...playSorted);
        } else {
            answer.push(...playSorted.slice(0, 2));
        }
    });
    return answer.map(Number);
}