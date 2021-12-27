function solution(numbers) {
    let answer = 0;
    let all = [];
    let all_set;
    for (let i = 1; i <= numbers.length ; i++) {
        const result = getSub(i, numbers);
        result.forEach(el => all.push(Number(el)));
    }
    all_set = [...new Set(all)];
    all_set.forEach(el => isPrime(el) ? answer++ : _);
    return answer;
}

function getSub(count, arr) {
    let sub = [];
    for (let i = 0 ; i < arr.length; i++) {
        if (count === 1) {
            sub.push(arr[i]);
        } else {
            let result = getSub(count-1, [...arr.slice(0,i), ...arr.slice(i+1)]);
            result.forEach(el => sub.push(arr[i] + el));
        }
    }
    return [...new Set(sub)];
}

function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    for ( let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i < 1) {
            return false;
        }
    }
    return true;
}
