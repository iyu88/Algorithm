function solution(board, moves) {
    let answer = [];
    let answer2 = 0;
    for (let i = 0; i < moves.length; i++){
        if ( answer.length >=2 & answer[answer.length-2] === answer[answer.length-1]){
            answer.splice(-2,2);
            answer2 += 2;
        }
        for (let j = 0; j < board[0].length; j++){
            if (board[j][moves[i] - 1] !== 0){
                answer.push(board[j][moves[i]-1]);
                board[j][moves[i]-1] = 0;
                break;
            }
        }
    }
    return answer2;
}
