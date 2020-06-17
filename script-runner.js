'use strict';

const game = require('./game-script');
const { question, write } = require('./io');
const { inRange, isNumeric } = require('./helpers');

const printOptions = options => {
  for (let i = 0; i < options.length; i++) {
    const number = i + 1;
    const option = options[i];
    console.log(`${number}: ${option.title}`);
  }
};

const printDescriptions = description => {
  write('Description');
  write(description);
};

const isValidOptionNumber = (optionNumber, numberOfAnswers) =>
  (isNumeric(optionNumber) && inRange(optionNumber, 1, numberOfAnswers));

const askNumberOfAnswer = async numberOfAnswers => {
  const answer = await question('Make a choice\n');
  if (isValidOptionNumber(answer, numberOfAnswers)) {
    return answer - 1;
  }
  write('Wrong answer!!!');
  return await askNumberOfAnswer();
};

const whatToDo = num => {
  const option = game.currentLocation.options[num];
  option.event(option.argument);
};

const recursiveQuestion = async () => {
  const options = game.currentLocation.options;
  printDescriptions(game.currentLocation.description);
  printOptions(options);
  const answer = await askNumberOfAnswer(options.length);
  whatToDo(answer);
  await recursiveQuestion();
};

recursiveQuestion(whatToDo);
