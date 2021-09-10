function solution(w, h2h) {
    return h2h.map((m, i) => {
        let win = 0;
        let n = 0;
        let u = 0;
        m.split('').map((r, j) => r !== "N" ? (r === "W" ? (w[i] < w[j] ? (u++, win++) : win++) : win = win) : n++)
        return [!(win / (m.length - n)) ? 0 : win / (m.length - n), u, i];
    }).sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0] // this line
        } else if (a[0] === b[0]) {
            if ( a[1] !== b[1] ) {
                return b[1] - a[1] // this line
            } else if ( a[1] === b[1] ) {
                if ( w[a[2]] !== w[b[2]]) {
                    return w[b[2]] - w[a[2]] // this line
                } else {
                    return a[2] - b[2] // this line
                }
            }
        }
    // .sort((a, b) =>  b[0] - a[0] || b[1] - a[1] || w[b[2]] - w[a[2]] || a[2] - b[2])
    }).map((answers) => answers[2] + 1);
}
