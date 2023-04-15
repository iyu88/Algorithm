function solution(key, lock) {
  const M = key[0].length;
  const N = lock[0].length;
  const board = Array.from({length: M*2 + N}, () => Array.from({length: M*2 + N}, () => 0));
  
  for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
          board[y + M][x + M] = lock[y][x];
      }
  }
  
  const rotate = () => {
      const rotated = Array.from({length: M}, () => Array.from({length: M}, () => null));
      for (let y = 0; y < M; y++) {
          for (let x = 0; x < M; x++) {
              rotated[y][x] = key[M-1-x][y];
          }
      }
      return rotated;
  }
  
  const putKey = (ky, kx) => {
      for (let y = 0; y < M; y++) {
          for (let x = 0; x < M; x++) {
              board[y + ky][x + kx] += key[y][x];
          }
      }
  }
  
  const pullKey = (ky, kx) => {
      for (let y = 0; y < M; y++) {
          for (let x = 0; x < M; x++) {
              board[y + ky][x + kx] -= key[y][x];
          }
      }
  }
  
  const isOpen = () => {
      for (let y = 0; y < N; y++) {
          for (let x = 0; x < N; x++) {
              if (board[y+ M][x + M] !== 1) return false;
          }
      }
      return true;
  }
  
  for (let k = 0 ; k < 4 ; k++) {
      key = rotate();
      
      for (let y = 0; y < M+N; y++) {
          for (let x = 0; x < M+N; x++) {
              putKey(y, x);
              if (isOpen()) return true;
              pullKey(y, x);
          }
      }
  }
  
  return false;    
}