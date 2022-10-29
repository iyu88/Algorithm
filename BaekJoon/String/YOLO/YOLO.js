const fs = require('fs');
let [num, str] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(str.split('').map(el => el.charCodeAt(0)).some((el, i, arr) => {
    if (i + 5 <= arr.length) {
        let sliced = arr.slice(i, i+5);
        let adjacent = [];
        return sliced.reduce((acc, cur, index) => {
            if (adjacent.length) {
                if (adjacent.includes(cur)) {
                    adjacent = cur === 65 ? [66] : cur === 90 ? [89] : [cur-1, cur+1];
                    return [...acc, true];
                } else {
                    adjacent = cur === 65 ? [66] : cur === 90 ? [89] : [cur-1, cur+1];
                    return [...acc, false];
                }
            } else {
                adjacent = cur === 65 ? [66] : cur === 90 ? [89] : [cur-1, cur+1];
                return [true];
            }
        }, []).every(el => el === true);
    }
    return false;
}) ? "YES" : "NO");
