const fs = require("fs");
const [nums, ...inputs] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const Node = function (value, prev = null, next = null) {
  this.value = value;
  this.prev = prev;
  this.next = next;
};

const Queue = function () {
  this.head = new Node(null);
  this.tail = new Node(null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.length = 0;

  this.add = (value) => {
    const node = new Node(value);
    const tailPrev = this.tail.prev;
    node.next = this.tail;
    node.prev = tailPrev;
    this.tail.prev = node;
    tailPrev.next = node;
    this.length++;
  };

  this.remove = () => {
    if (this.length === 0) return null;
    const headNext = this.head.next;
    const value = headNext.value;
    this.head.next = headNext.next;
    headNext.next.prev = this.head;
    this.length--;
    return value;
  };
};

const [N, M] = nums.split(" ").map(Number);
const Q = new Queue();
let index = 0;
const slots = inputs.slice(index, index + N).map(Number);
const S = Array(N).fill(false);
index += N;
const cars = inputs.slice(index, index + M).map(Number);
index += M;
const orders = inputs.slice(index, index + M * 2).map(Number);

let answer = 0;

orders.forEach((el) => {
  if (el > 0) {
    if (S.some((el) => el === false)) {
      const emptySlot = S.indexOf(false);
      S[emptySlot] = el;
      answer += cars[el - 1] * slots[emptySlot];
    } else {
      Q.add(el);
    }
  } else {
    const carNumber = el * -1;
    const carSlot = S.indexOf(carNumber);
    S[carSlot] = false;
    if (Q.length) {
      const nextCar = Q.remove();
      S[carSlot] = nextCar;
      answer += cars[nextCar - 1] * slots[carSlot];
    }
  }
});

console.log(answer);
