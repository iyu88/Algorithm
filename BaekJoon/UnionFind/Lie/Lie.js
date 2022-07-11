const fs = require("fs");
let [nums, people, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [N, M] = nums.split(" ").map(Number);
let answer = 0;
let parent = {};

const findParent = (obj, t) => {
  if (obj[t] !== t) obj[t] = findParent(obj, obj[t]);
  return obj[t];
};

const unionFind = (obj, a, b) => {
  a = findParent(obj, a);
  b = findParent(obj, b);
  if (a < b) obj[b] = a;
  else obj[a] = b;
};

// 초기화
for (let i = 1; i <= N; i++) {
  parent[i] = i;
}

// 각 파티 참석자를 같은 부모로 묶음
for (let i = 0; i < M; i++) {
  let [num, ...$case] = arr[i].split(" ").map(Number);
  if (num > 1) {
    for (let j = 1; j < num; j++) {
      if (findParent(parent, $case[0]) !== findParent(parent, $case[j]))
        unionFind(parent, $case[0], $case[j]);
    }
  }
}

// 진실을 아는 사람들을 같은 부모로 묶음
people = people.split(" ").map(Number).slice(1);
people.forEach((el) => {
  if (findParent(parent, people[0]) !== findParent(parent, el))
    unionFind(parent, people[0], el);
});

// 파티에 참석한 사람 중 진실을 아는 사람이 있으면 같은 부모로 묶음
for (let i = 0; i < M; i++) {
  let [num, ...$case] = arr[i].split(" ").map(Number);
  if (num > 1) {
    for (let j = 1; j < num; j++) {
      if (
        people.includes($case[j]) &&
        findParent(parent, people[0]) !== findParent(parent, $case[j])
      ) {
        unionFind(parent, people[0], $case[j]);
        people.push($case[j]);
      }
    }
  }
}

// 파티 참석자 중에서 진실을 아는 사람이 한 명도 없을 경우 참석 가능
for (let i = 0; i < M; i++) {
  let [num, ...$case] = arr[i].split(" ").map(Number);
  let flag = false;
  for (let j = 0; j < num; j++) {
    if (findParent(parent, people[0]) === findParent(parent, $case[j])) {
      flag = true;
      break;
    }
  }
  if (flag === false) answer++;
}

console.log(answer);
