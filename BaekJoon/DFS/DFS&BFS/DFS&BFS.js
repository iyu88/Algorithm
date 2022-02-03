const fs = require('fs');
let [nums, ...temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M, V] = nums.split(' ').map(el => +el);
let answer1 = [];
let answer2 = [];
let visited = Array(N).fill(false);
let points = Array.from(Array(N), () => []);
let arr = temp.map(el => el.split(' ').map(el2 => +el2));
arr.forEach(el => {
		let [from, to] = el;
  	points[from-1].push(to-1);
  	points[to-1].push(from-1);
});
points.map(el => el.sort((a, b) => a - b));

const dfs = (from) => {
	if (!visited[from]) {
    	answer1.push(from);
    	visited[from] = true;
        for (const to of points[from]) {
    		dfs(to);
    	}
    }
}

dfs(V-1);
console.log(answer1.map(el => el + 1).join(' '));

let q = [V-1];
visited = Array(N).fill(false);

while (q.length) {
	let from = q.shift();
    if (!visited[from]) {
    	answer2.push(from);
    	visited[from] = true;
        for (const to of points[from]) {
        	if (!visited[to]) {
                q.push(to);
            }
        }
    }
}

console.log(answer2.map(el => el + 1).join(' '));
