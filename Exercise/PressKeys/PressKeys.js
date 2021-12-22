function solution(numbers, hand) {
    let answer = [];
    let $left = [3,0];
    let $right = [3,2];
    numbers.forEach(el => {
        if (el === 1 || el === 4 || el === 7) {
            answer.push('L');
            $left = [Math.floor(el / 3),0];
        } else if (el > 0 && el % 3 === 0) {
            answer.push('R');
            $right = [(el / 3) - 1,2];
        } else {
            let index;
            el !== 0 ? index = Math.floor(el / 3) : index = 3;
            let target = [index,1];
            let left_d = Math.ceil(Math.sqrt(Math.pow((target[0]-$left[0]), 2) + Math.pow((target[1]-$left[1]),2)));
            let right_d = Math.ceil(Math.sqrt(Math.pow((target[0]-$right[0]), 2) + Math.pow((target[1]-$right[1]),2)));
            if (left_d === right_d) { 
                hand === 'left' ? ( answer.push('L'), $left = [index,1]) : ( answer.push('R'),  $right = [index,1]);
            } else if (left_d > right_d) {
                answer.push('R');
                $right = [index,1];
            } else {
                answer.push('L');
                $left = [index,1];
            }
        }
    });
    return answer.join('');
}
