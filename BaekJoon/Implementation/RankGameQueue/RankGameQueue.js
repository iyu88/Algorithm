const fs = require("fs");
const [info, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const Room = function ([level, id], maximumCount) {
  this.maximumCount = maximumCount;
  this.player = [[level, id]];
  this.max = level + 10;
  this.min = level - 10;

  this.isFull = () => this.player.length === this.maximumCount;

  this.isAvailableLevel = (level) =>
    level > this.max || level < this.min ? false : true;

  this.add = (person) => this.player.push(person);

  this.printAll = () => {
    console.log(this.isFull() ? "Started!" : "Waiting!");

    this.player
      .sort((a, b) => a[1].localeCompare(b[1]))
      .forEach((p) => console.log(p.join(" ")));
  };
};

const [p, m] = info.split(" ").map(Number);
const rooms = [];

inputs.forEach((el) => {
  const [level, id] = el.split(" ");
  let isAttend = false;

  for (let r = 0; r < rooms.length; r++) {
    const room = rooms[r];
    if (room.isFull() || !room.isAvailableLevel(level)) continue;
    room.add([+level, id]);
    isAttend = true;
    break;
  }

  if (isAttend === false) {
    rooms.push(new Room([+level, id], m));
  }
});

rooms.forEach((r) => r.printAll());
