const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const divide = (arr, left, right) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    while (left <= right) {
        while (arr[left] < pivot) left++;
        while (arr[right] > pivot) right--;
        if (left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
    
    return left;
}

const quickSort = (arr, left = 0, right = arr.length-1) => {
    if (left >= right) return arr;
    if (arr.length < 2) return arr;
    
    const divided = divide(arr, left, right);
    
    quickSort(arr, left, divided-1);
    quickSort(arr, divided, right);
    
    return arr;
}

const getSubs = (arr, target) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (target === 1) {
            result.push([arr[i]]);
        } else {
            const temp = getSubs(arr.slice(i+1), target-1);
            temp.forEach(el => result.push([...el, arr[i]]));
        }
    }
    
    return result;
}

const cases = getSubs(inputs, 7);

for (let i = 0 ; i < cases.length ; i++) {
    const sum = cases[i].reduce((acc, cur) => acc + cur, 0);
    if (sum === 100) {
        console.log(quickSort(cases[i]).join('\n'));
        break;
    }
}
