const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const DY = [-1, 0, 1, 0];
const DX = [0, 1, 0, -1];

for (let i = 0 ; i < inputs.length ; i++) {
    const str = inputs[i];
    let cx = 0;
    let cy = 0;
    let cd = 0;
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
    
    for (let j = 0 ; j < str.length ; j++) {
        const char = str[j];
        
        if (char === 'L' || char === 'R') {
            if (char === 'L') cd = (cd + 3) % 4;
            else cd = (cd + 1) % 4;
        } else {
            if (char === 'F') {
                cx += DX[cd];
                cy += DY[cd];
            } else {
                cx -= DX[cd];
                cy -= DY[cd];
            }
            maxX = Math.max(cx, maxX);
            maxY = Math.max(cy, maxY);
            minX = Math.min(cx, minX);
            minY = Math.min(cy, minY);
        }
    }
    
    console.log((maxX - minX) * (maxY - minY));
}
