const fs = require('fs');
const [lengths, A, B] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
const [first_length, second_length] = lengths.split(' ').map(Number);
const first_array = A.split(' ').map(Number);
const second_array = B.split(' ').map(Number);
let first_index = 0;
let second_index = 0;

while (first_length > first_index || second_length > second_index) {    
    if (first_array[first_index] < second_array[second_index]) answer.push(first_array[first_index++]);
    else answer.push(second_array[second_index++]);
    
    if (first_length === first_index) {
        while (second_length !== second_index) answer.push(second_array[second_index++]);
    } 
    else if (second_length === second_index) {
        while (first_length !== first_index) answer.push(first_array[first_index++]);
    }
}

console.log(answer.join(' '));
