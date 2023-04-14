function solution(rectangle, characterX, characterY, itemX, itemY) {
  const N = 102;
  const board = Array.from({length: N}, () => Array.from({length: N}, () => 0));
  const DY = [-1, 0, 1, 0];
  const DX = [0, -1, 0, 1];
  
  let visited;
  let answer = Infinity;
  
  rectangle.forEach(rect => {
      const [x1, y1, x2, y2] = rect.map(el => el * 2);
      
      for (let y = y1; y <= y2; y++) {
          board[y][x1] = board[y][x2] = 1;
      }
      for (let x = x1; x <= x2; x++) {
          board[y1][x] = board[y2][x] = 1;
      }
  });
  
  rectangle.forEach(rect => {
      const [x1, y1, x2, y2] = rect.map(el => el * 2);
      
      for(let y = y1 + 1; y < y2; y++) {
          for (let x = x1 + 1; x < x2; x++) {
              board[y][x] = 0;
          }
      }
  });
  
  const dfs = (y, x, dist) => {
      if (y === itemY * 2 && x === itemX * 2) {
          answer = Math.min(answer, dist);
      }
      
      for (let k = 0 ; k < 4 ; k++) {
          const dyy = DY[k] + y;
          const dxx = DX[k] + x;
          
          if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N || visited[dyy][dxx]) continue;
          
          if (board[dyy][dxx]) {
              visited[dyy][dxx] = true;
              dfs(dyy, dxx, dist + 1);
          }
      }
  }
  
  const [CY, CX] = [characterY * 2, characterX * 2];
  
  for (let k = 0 ; k < 4 ; k++) {
      const dyy = DY[k] + CY;
      const dxx = DX[k] + CX;
          
      if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
      
      visited = Array.from({length: N}, () => Array.from({length: N}, () => false));
      visited[CY][CX] = true;
      visited[dyy][dxx] = true;
      dfs(CY, CX, 1);
  }
  
  return Math.floor(answer / 2);
}