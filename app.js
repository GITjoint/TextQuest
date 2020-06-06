'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: true,
});

const printOptions = options => {
  for (const key in options) {
    console.log(`${key}: ${options[key].title}`);
  }
}


// Data //

const locations = {
  Village: {
    options: [
      {
        title: 'The player is tasked with killing an ancient evil that terrorizes one small village. Accept the task.',
        argument: 'Paper with demons portrait',
        event: takeItem,
      },
      {
        title: 'Enter the dungeon',
        argument: 'Enterence',
        event: goAhead,
      },
    ],
  },
  Enterence: {
    options: [
      {
        title: 'You are in a strange dark and damp place near you chest and door. Snoop in an old chest',
        argument: 'Silver sword',
        event: takeItem,
      },
      {
        title: 'Go to the enterence to the catacombs',
        argument: 'Catacombs',
        event: goAhead,
      },
      {
        title: 'Go back',
        argument: 'Village',
        event: goAhead,
      },
    ],
  },
  Catacombs: {
    options: [
      {
        title: 'In the catacombs on the wall, you notice a strange brick, maybe it will open something. Examine the suspicious brick in the wall',
        argument: 'Shield',
        event: takeItem,
      },
      {
        title: 'Enter to the abandoned barracks',
        argument: 'Barracks',
        event: goAhead,
      },
      {
        title: 'Go back',
        argument: 'Enterence',
        event: goAhead,
      },
    ],
  },
  Barracks: {
    options: [
      {
        title: 'Nobody has been here for a long time, but it’s possible to find something. Chek under the bed.',
        argument: 'Iron chestplate and helmet',
        event: takeItem,
      },
      {
        title: 'Pull the lever and open the door to the secret room',
        argument: 'Tomb',
        event: goAhead,
      },
      {
        title: 'Go back',
        argument: 'Catacombs',
        event: goAhead,
      },
    ],
  },
  Tomb: {
    options: [
      {
        title: 'You entered the tomb of the ancient demon Sindorai and it looks like he is not very pleased with this.Kill him.',
        argument: 'Sindorai\'s tear (Totem of Immortality)',
        event: takeItem,
      },
      {
        title: 'Leave the dungeon',
        argument: 'Woods',
        event: goAhead,
      },
      {
        title: 'Go back',
        argument: 'Barracks',
        event: goAhead,
      },
    ],
  },
  Woods: {
    options: [
      {
        title: 'Outside you were met by the prince of a village nearby, in which Durotan was constantly atrocious. In gratitude, he gives you a residence permit in his village',
        argument: 'Residennce permit and key',
        event: takeItem,
      },
      {
        title: 'Play again',
        argument: 'Village',
        event: goAhead,
      },
    ],
  },
}

let currentLocation = locations.Village;
const inventory = [];

function takeItem (item) {
  console.log(`${item} picked up!\n`);
  inventory.push(item);
  console.log(`Your inventory: `);
  console.log(inventory);
  console.log('\n');
}

function goAhead (where) {
  console.log(`You are in the ${where}\n`);
  currentLocation = locations[where];
}


// MAIN //

const recursiveQuestion = (callback) => {
  printOptions(currentLocation.options);
  rl.question('Make a choice\n', (answer) => {
    if (answer === 'exit') return rl.close();
    callback(answer);
    recursiveQuestion(callback);
  });
};

const whatToDo = num => { // Функция, обрабатывающая опции
  //console.log("Опция: " + num);
  const option = currentLocation.options[num];
  option.event(option.argument);
};

recursiveQuestion(whatToDo);
