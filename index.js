// 'use strict';

const map = new Map();
map.set(1, 'один');
map.set(6, 'шесть');
map.set(8, 'восемь');
map.set(14, 'четырнадцать');
map.set(36, 'тридцать шесть');

const array = [2, 7, 99, 14, 33, 123, 36, 17];

function encryptArray(map, array) {
  return array.filter((item) => map.has(item)).map((item) => map.get(item));
}

encryptArray(map, array);

function createAnchor(item) {
  const anchor = document.createElement('a');
  anchor.href = `#${item.id}`;
  anchor.innerText = item.innerText;
  anchor.title = item.innerText;
  return anchor;
}

function createListItem(item) {
  const listItem = document.createElement('li');
  listItem.append(createAnchor(item));
  navigation.append(listItem);
}

const navigation = document.createElement('aside');
const list = document.createElement('ul');
document.body.append(navigation);

const questions = document.querySelectorAll('h2');
questions.forEach((item, index) => (item.id = `id${index}`));
questions.forEach((item) => createListItem(item));

function createHeadingsString(str) {
  return str
    .split('\n')
    .filter((item) => item !== '')
    .map((item) => `<h2>${item}</h2><hr/>`)
    .join('\n\n');
}

const preTags = document.querySelectorAll('pre');
preTags.forEach((item) => {
  item.innerText = item.innerText
    .split('\n')
    .map((item) => item.slice(6))
    .join('\n');
});

class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
}

class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
}

Array.prototype.flat2 = function () {
  const res = [];
  this.forEach((item) => {
    if (Array.isArray(item)) {
      res.push(...item.flat2());
    } 
    else {
      res.push(item);
    }
  });
  return res;
};

const arr = [1, 2, [3, 4, [5, [6, [7, [8]]]]], 9];

console.log(arr.concat([10]));
console.log(arr);
console.log(Object.prototype);
console.log(Array.prototype);