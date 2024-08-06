const drinks = [
  {
    name: "Coffee",
    addictive: true,
    info: function () {
      console.log(`${this.name} is ${this.addictive ? "" : "not "} addictive.`);
    },
  },
  {
    name: "Celery Juice",
    addictive: false,
    info: function () {
      console.log(`${this.name} is ${this.addictive ? "" : "not "} addictive.`);
    },
  },
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

pickRandom(drinks).info();
