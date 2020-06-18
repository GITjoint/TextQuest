'use strict';

const { question, print } = require('./io');
const { inRange, isNumeric } = require('./helpers');

const printOptions = options => {
  for (let i = 0; i < options.length; i++) {
    const number = i + 1;
    const option = options[i];
    console.log(`${number}: ${option.title}`);
  }
};

const printDescriptions = description => {
  print('Description');
  print(description);
};

const isValidOptionNumber = (optionNumber, numberOfAnswers) =>
  (isNumeric(optionNumber) && inRange(optionNumber, 1, numberOfAnswers));

const askNumberOfAnswer = async numberOfAnswers => {
  const answer = await question('Make a choice\n');
  if (isValidOptionNumber(answer, numberOfAnswers)) {
    return answer - 1;
  }
  print('Wrong answer!!!');
  return await askNumberOfAnswer(numberOfAnswers);
};

const startEvent = (numberOfAnswer, gameScript) => {
  const option = gameScript.currentLocation.options[numberOfAnswer];
  option.event(option.argument);
};


const recursiveQuestion = async game => {
  const options = game.currentLocation.options;
  printDescriptions(game.currentLocation.description);
  printOptions(options);
  const answer = await askNumberOfAnswer(options.length);
  startEvent(answer, game);
  await recursiveQuestion(game);
};

const printTitle = title => print(`SCRIPT TITLE: ${title}`);

const startGameScript = async gameScript => {
  printTitle(gameScript.title);
  await recursiveQuestion(gameScript);
};

module.exports = startGameScript;
