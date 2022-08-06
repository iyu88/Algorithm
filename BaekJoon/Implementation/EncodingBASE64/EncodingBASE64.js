const fs = require("fs");
let str = fs.readFileSync("/dev/stdin").toString().trim();

// BASE64 글자
const DICT = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
);

// BASE64 로 변환
const encodeBASE64 = (data) => {
  let [pad, str] = splitInto6(
    encodeURI(data)
      .split("")
      .map((el) => fillBit(el.charCodeAt(0).toString(2), 8))
      .join("")
  );
  return `${str.map((el) => DICT[parseInt(el, 2)]).join("")}${"=".repeat(pad)}`;
};

// count 인자만큼 비트 개수 맞추는 함수
const fillBit = (binary, count) => {
  if (binary.length < count) {
    return "0".repeat(count - binary.length).concat(binary);
  } else return binary;
};

// 6비트씩 끊어서 반환하는 함수 (모자란 비트만큼 패딩 추가)
const splitInto6 = (str) => {
  let index = 0;
  let splitted = [];
  let len = str.length;
  let pad = Math.floor(len % 6);
  if (pad) str += "0".repeat(6 - pad);
  while (index < len) {
    if (index + 6 < len) splitted.push(str.slice(index, index + 6));
    else splitted.push(str.slice(index));
    index += 6;
  }
  return [Math.floor(len % 3), splitted];
};

console.log(encodeBASE64(str));
