function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

function factorial2(n) {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return arr.reduce((acc, item) => acc * item, 1);
}

function factorialMemo() {
  const cache = {};
  return (n) => {
    if (n in cache) {
      console.log('Fetching from cache ', cache[n]);
      return cache[n];
    }

    cache[n] = factorial(n);
    console.log('Calculating result', cache[n]);
    return cache[n];
  };
}

// const res = factorial2(150);
// console.log(res);
// console.log(factorial(150));

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// const res2 = document.querySelector('.aaaa').children;
// console.log(res2);

// Symbol.iterator

let person = {
  name: 'Mark',
  age: 30,
  gender: 'male',
  interests: ['music', 'fishing'],
  // [Symbol.iterator]: function () {
  //   const properties = Object.keys(this);
  //   let count = 0;

  //   return {
  //     next() {
  //       if (count < properties.length) {
  //         const key = properties[count];
  //         count++;
  //         return { done: false, value: person[key] };
  //       } else {
  //         return { done: true };
  //       }
  //     },
  //   };
  // },

  // [Symbol.iterator]() {
  //   const props = Object.keys(this);
  //   let count = 0;
  //   return {
  //     next() {
  //       if (count >= props.length) return { done: true };
  //       const key = props[count++];
  //       return { done: false, value: person[key]};
  //     },
  //   };
  // },

  *[Symbol.iterator]() {
    const props = Object.keys(this);
    for (let i = 0; i < props.length; i++) {
      const key = props[i];
      yield this[key];
    }
  },
};

// for (let item of person) {
//   console.log(item, ': ');
// }

function fibonacci(n) {
  if (n === 1 || n === 2) return 1;
  return fibonacci(n - 2) + fibonacci(n - 1);
}

function fibonacci2(n) {
  let i = 0;
  const result = [0, 1];
  while (i < n - 1) {
    result.push(result[i] + result[i + 1]);
    i++;
  }
  return result;
}

// Pseudo Random Generator

function* pseudoRandom(seed) {
  let value = seed;
  let count = 0;
  while (count < 100) {
    value = (value * 16807) % 2147483647;
    count++;
    yield value;
  }
}

// Carry Function Example

function carry(func) {
  return function (a) {
    return function (b) {
      return function (c) {
        return func(a, b, c);
      };
    };
  };
}

// const sum = (a, b, c) => (a * b) / c;
// const carrySum = carry((a, b, c) => (a * b) / c);
// const part = carrySum(12)(77);
// const part2 = sum.bind(null, 12, 77);
// const aaa = 55
// console.log(part(55));
// console.log(part2(55));

// Compare (Pipe) Function Example

function pipe(...args) {
  return (x) => args.reduce((acc, func) => func(acc), x);
}

function double(a) {
  return a * 2;
}

function addOne(a) {
  return a + 1;
}

const fun = pipe(double, addOne, double)(5);
// console.log(fun);

class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

function Clock1({ template }) {
  let timer;

  function render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  this.stop = function () {
    clearInterval(timer);
  };

  this.start = function () {
    render();
    timer = setInterval(render, 1000);
  };
}

// // let clock = new Clock({ template: 'h:m:s' });
// // clock.start();
// let clock = new Clock({ template: 'h:m:s' });
// clock.start();
// console.log();

function* aaaa() {
  yield 1;
  yield 2;
  return;
}

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  say() {
    console.log(this.name);
  }
}

const user = new User('Alex', 30);
const user2 = Object.create(User);

// console.log(user);
// console.log(user2);

// Fetch GET async/await

const url = 'http://jsonplaceholder.typicode.com/posts';

async function loadPosts() {
  const response = await fetch(url);
  // console.log(response);
  const posts = await response.json();
  // console.log(posts);
}

loadPosts();

// Fetch POST async/await

async function sendPost() {
  const response = await fetch(url, {
    method: 'Post',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const data = await response.json();
  // console.log(data);
}

sendPost();

// Fetch GET Promise

const prom = fetch(url).then((res) => res.json());
// .then((data) => console.log(data));

// XMLHttpRequest GET

let xhr = new XMLHttpRequest();

xhr.responseType = 'json';
xhr.open('GET', url);
xhr.send();

xhr.onload = function () {
  const respObj = xhr.response;
};

const message = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};

// XMLHttpRequest POST

let xhrPost = new XMLHttpRequest();

xhrPost.responseType = 'json';

xhrPost.open('POST', url);
xhrPost.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhrPost.send(JSON.stringify(message));

xhrPost.onload = function () {
  const respObj = xhrPost.response;
};

// Drag n Drop

const element = document.getElementById('p1');
element.setAttribute('draggable', true);
element.addEventListener('dragstart', dragstart_handler);

const targetEl = document.getElementById('target');
targetEl.addEventListener('dragover', dragover_handler);
targetEl.addEventListener('drop', dragdrop_handler);

function dragstart_handler(event) {
  event.dataTransfer.setData('text/html', event.target.id);
}

function dragover_handler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function dragdrop_handler(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/html');
  console.log(event.dataTransfer);
  event.target.appendChild(document.getElementById(data));
}

let start = null;
let element2 = document.getElementById('SomeElementYouWantToAnimate');

function step(timestamp) {
  if (!start) start = timestamp;
  let progress = timestamp - start;
  element2.style.transform =
    'translateX(' + Math.min(progress / 10, 500) + 'px)';
  if (progress < 5000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);

const obj = {
  name: 'obj',
  props: {
    name: 'props',
    getName() {
      return this.name;
    },
  },
};

console.log(obj.props.getName());
