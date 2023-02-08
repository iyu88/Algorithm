const fs = require('fs');
const [nums, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M, R] = nums.split(' ').map(Number);
let [half_N, half_M] = [Math.floor(N / 2), Math.floor(M / 2)];
const [operation] = input.splice(N);
let arr = input.map(line => line.split(' ').map(Number));

const reverseVertical = () => {
    arr = arr.reverse();
}

const reverseHorizontal = () => {
    arr = arr.map(line => line.reverse());
}

const createEmptyArray = (Y, X) => Array.from(Array(Y), () => Array(X).fill(null));

const swapWidthAndHeight = () => [N, M, half_N, half_M] = [M, N, half_M, half_N];

const rotateRight = () => {
    const temp = createEmptyArray(M, N);
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) temp[x][N-1-y] = arr[y][x];
    }
    swapWidthAndHeight();
    arr = temp;
}

const rotateLeft = () => {
    const temp = createEmptyArray(M, N);
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) temp[M-1-x][y] = arr[y][x];
    }
    swapWidthAndHeight();
    arr = temp;
}

const getSection = (from_y, from_x, to_y, to_x) => {
    const temp = createEmptyArray(Math.floor(N / 2), Math.floor(M / 2));
    for (let y = from_y; y < to_y; y++) {
        for (let x = from_x; x < to_x; x++) temp[y-from_y][x-from_x] = arr[y][x];
    }
    return temp;
}

const getAllSection = () => {
    const first_section = getSection(0, 0, half_N, half_M);
    const second_section = getSection(0, half_M, half_N, M);
    const third_section = getSection(half_N, half_M, N, M);
    const forth_section = getSection(half_N, 0, N, half_M);
    return [first_section, second_section, third_section, forth_section];
}

const rotateClockside = () => {
    const temp = createEmptyArray(N, M);
    const [first_section, second_section, third_section, forth_section] = getAllSection();
    for (let y = 0 ; y < N ; y++) {
        for (let x = 0 ; x < M ; x++) {
            if (y < half_N) temp[y][x] = x < half_M ? forth_section[y][x] : first_section[y][x-half_M];
            if (y >= half_N) temp[y][x] = x < half_M ? third_section[y-half_N][x] : second_section[y-half_N][x-half_M];
        }
    }
    arr = temp;
}

const rotateReverseClockside = () => {
    const temp = createEmptyArray(N, M);
    const [first_section, second_section, third_section, forth_section] = getAllSection();
    for (let y = 0 ; y < N ; y++) {
        for (let x = 0 ; x < M ; x++) {
            if (y < half_N) temp[y][x] = x < half_M ? second_section[y][x] : third_section[y][x-half_M];
            if (y >= half_N) temp[y][x] = x < half_M ? first_section[y-half_N][x] : forth_section[y-half_N][x-half_M];
        }
    }
    arr = temp;
}

const operation_map = {
    1: reverseVertical,
    2: reverseHorizontal,
    3: rotateRight,
    4: rotateLeft,
    5: rotateClockside,
    6: rotateReverseClockside,
}

operation.split(' ').map(operation => operation_map[operation]());

console.log(arr.map(el => el.join(' ')).join('\n'));
