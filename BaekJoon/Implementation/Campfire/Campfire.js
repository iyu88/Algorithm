const fs = require("fs");
const [n, e, ...days] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = +n;
const E = +e;
const people = {};
let songName = 0;

for (let i = 1; i <= N; i++) {
  people[i] = {};
}

days.forEach((el) => {
  const [_, ...attendants] = el.split(" ").map(Number);
  const isSY = attendants.includes(1);

  if (isSY) {
    songName++;
    attendants.forEach((el) => {
      people[el][songName] = true;
    });
  } else {
    const totalSong = {};
    attendants.forEach((el) => {
      const songs = people[el];
      Object.keys(songs).forEach((s) => {
        if (totalSong[s] === undefined) totalSong[s] = true;
      });
    });

    attendants.forEach((el) => {
      people[el] = { ...totalSong };
    });
  }
});

console.log(
  Object.keys(people)
    .filter((key) => Object.keys(people[key]).length === songName)
    .join("\n")
);
