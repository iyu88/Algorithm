const fs = require('fs');
let [nums, ...temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [ALL, SHOP] = nums.split(' ').map(el => +el);

let set = Math.ceil(ALL / 6); 
let piece1 = Math.floor(ALL / 6);
let piece2 = ALL % 6;

let arr = temp.map(el => {
    let v = el.split(' ').map(el2 => +el2);
    return [(set * v[0]), (piece1 * v[0]), (piece2 * v[1]), (ALL * v[1])];
});

let mins = [];
for (let i = 0 ; i < arr[0].length; i++) {
	mins[i] = Math.min(...arr.map(el => el[[i]]));
}

console.log(Math.min(mins[0], (mins[1] + mins[2]), mins[3]));
