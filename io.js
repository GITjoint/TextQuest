'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = text => new Promise((
  resolve => rl.question(text, answer => resolve(answer))));

const print = text => console.log(text);

module.exports = {
  question,
  print,
};
