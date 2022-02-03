const fs = require('fs');
let [size, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [m, n] = size.split(' ').map(el => +el);
let answer = [];

for (let i = 0 ; i <= m - 8; i++ ) {
    let temp = arr.slice(i, i+8); 
    for (let j = 0 ; j <= n - 8; j++) {
        let temp2 = temp.map(el => el.split('').slice(j, j+8));
        let $switch = 0;
        
        function switch_Loop1 () {
            for (let a = 0 ; a < 8; a++) {
                for (let b = 0 ; b < 8; b++) {
                    if (a % 2 === 0) {
                        if ((b % 2 === 0 && temp2[a][b] === 'W') || (b % 2 !== 0 && temp2[a][b] === 'B')) {
                            $switch++;
                        }
                    } else if (a % 2 !== 0) {
                        if ((b % 2 === 0 && temp2[a][b] === 'B') || (b % 2 !== 0 && temp2[a][b] === 'W')) {
                            $switch++;
                        }
                    }
                }
            }
        }
        
        function switch_Loop2 () {
            for (let a = 0 ; a < 8; a++) {
                for (let b = 0 ; b < 8; b++) {
                    if (a % 2 === 0) {
                        if ((b % 2 === 0 && temp2[a][b] === 'B') || (b % 2 !== 0 && temp2[a][b] === 'W')) {
                             $switch++;
                        }
                    } else if (a % 2 !== 0) {
                        if ((b % 2 === 0 && temp2[a][b] === 'W') || (b % 2 !== 0 && temp2[a][b] === 'B')) { 
                             $switch++;
                        }
                    }   
                }
            }
        }
        
        if (temp2[0][0] === 'B') {
            switch_Loop1();
            answer.push($switch);
            temp2[0][0] = 'W';
            $switch = 1;
            switch_Loop2();
        } else if (temp2[0][0] === 'W') {
            switch_Loop2();
            answer.push($switch);
            temp2[0][0] = 'B';
            $switch = 1;
            switch_Loop1();
        }
        answer.push($switch);
    }
}

console.log(Math.min(...answer));
