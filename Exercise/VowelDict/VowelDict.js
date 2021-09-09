function solution(word) {
    let string = '';
    let chars = ['A', 'E', 'I', 'O', 'U'];
    let time = 0;
    while (string !== word) {
        time += 1;
        if ( string.length !== 5 ) {
            string += "A";
        } else if (string[string.length - 1] !== 'U') {
            let next = chars.indexOf(string[string.length - 1]);
            string = string.slice(0, string.length - 1);
            string += chars[next + 1];
        } 
        else if (string[string.length - 1] === 'U') {
            let i = 2;
            let next = chars.indexOf(string[string.length - i]);
            while (next === 4) {
                i++;
                next = chars.indexOf(string[string.length - i]);
            }
            string = string.slice(0, string.length - i);
            string += chars[next + 1];
        }
    }
    return time;
}
