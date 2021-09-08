function solution(table, languages, preference) {
    let answers = [];
    let jobs = ["SI", "CONTENTS", "HARDWARE", "PORTAL", "GAME"];
    table.map((t,i) => {
        const newArr = t.split(' ');
        newArr.splice(0,1);
        let sum = 0;
        languages.forEach((lang, index1) => {
            newArr.forEach((l, index2) => {
                if ( lang === l) {
                    sum += (5-index2) * preference[index1];
                }
            })
        })
        answers.push(sum);
    })
    const max_indices = answers.map((answer, i) => {
        if (answer === Math.max(...answers)) {
            return i;
        }
    });
    const job = jobs.map((j, i) => {
        if (max_indices.includes(i)) {
            return j;
        }
    });
    return job.sort()[0];
}
