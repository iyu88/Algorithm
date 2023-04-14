function solution(n, info) {
  let answer = Array(11).fill(0);
  let max = 0;
  
  const getMax = (apeach, ryan, shots, point, arr) => {
      if (n < shots) return;
      
      if (point > 10) {
          const extraScore = ryan - apeach;
          if (max < extraScore) {
              max = extraScore;
              arr[10] = n - shots;
              answer = arr;
          }
          return;
      }
      
      if (n > shots) {
          const copied = arr.slice();
          copied[10-point] = info[10-point] + 1;
          getMax(apeach, ryan + point, shots + copied[10-point], point + 1, copied);
      }
      
      if (info[10-point] > 0) {
          getMax(apeach + point, ryan, shots, point + 1, arr);
      } else {
          getMax(apeach, ryan, shots, point + 1, arr);
      }
  }
  
  getMax(0, 0, 0, 0, answer);
  
  return max <= 0 ? [-1] : answer;
}