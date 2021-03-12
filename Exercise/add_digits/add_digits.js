function solution(n)
{   
    let answer = 0;
    let newStr = n.toString();
    for(let i = 0 ; i < newStr.length; i++) {
        answer += parseInt(newStr[i]);
    }
    return answer;
}
