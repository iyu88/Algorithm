function solution(n, computers) {
    let answer = 0;
    let visited = Array(n).fill(false);
    let points = Array.from(Array(n), () => []);
    computers.forEach((c, i) => {
        c.forEach((el, j) => {
            if (i !== j && el) {
                points[i].push(j);
            }
        });
    });

    const dfs = (k) => {
        if (!visited[k]) {
            visited[k] = true;
        }
        for (let value of points[k]) {
            if (!visited[value]) {
                dfs(value);
            }
        }
    }

    for (let i = 0 ; i < n ; i++) {
        for (let j = 0 ; j < n ; j++) {
            if (i === j) continue;
            if (computers[i][j]) {
                if (!visited[i]) {
                    visited[i] = true;
                    dfs(j);
                    answer++;
                } else if (!visited[j]) {
                    visited[j] = true;
                    dfs(i);
                    answer++;
                }
            }
        }
    }

    return answer + visited.filter(el => el === false).length;
}