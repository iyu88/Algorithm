function solution(s, n) {
    const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let answer = [];
    for ( let i = 0; i < s.length; i++) {
        let el = s[i];
        if (el === ' ') {
            answer.push(el);
        } else if (el === el.toLowerCase()) {
            let index1 = (dictionary.indexOf(el.toUpperCase()) + n) % dictionary.length;
            let converted1 = dictionary[index1];
            answer.push(converted1.toLowerCase());
        } else if ( el === el.toUpperCase()) {
            let index2 = (dictionary.indexOf(el) + n) % dictionary.length;
            let converted2 = dictionary[index2];
            answer.push(converted2);
        }
    }
    return answer.join('');
}
