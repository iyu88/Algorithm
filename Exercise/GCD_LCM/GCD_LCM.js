const fs = require('fs');
let nums = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(el => +el).sort((a,b) => b - a);

const gcd = (b, s) => {
    return (s === 0) ? b : gcd(s, b % s);
}

const lcm = (b, s, gcd) => {
    // return (b * s) / gcd(b, s);
    return (b * s) / gcd;
}

let $GCD = gcd(nums[0], nums[1]);
console.log($GCD);
console.log(lcm(nums[0], nums[1], $GCD));
