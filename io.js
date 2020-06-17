'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: true,
});

const question = async text => new Promise((
  resolve => rl.question(text, answer => resolve(answer))));

const write = text => console.log(text);

module.exports = {
  question,
  write
};
