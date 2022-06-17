const fs = require('fs');
let [a, b] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number).sort((a, b) => a - b);

const lcm = (b, s) => {
	return s === 0 ? b : lcm(s, b % s);
}

const  gcd = (b, s, lcm) => {
	return (b * s) / lcm ;
}

console.log(gcd(b, a, lcm(b, a)));
