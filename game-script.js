'use strict';

const { write } = require('./io');

const locations = {
  Village: {
    description: 'The player is tasked with killing an ancient evil that terrorizes one small village.',
    options: [
      {
        title: 'Accept the task.',
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
    description: 'You are in a strange dark and damp place near you chest and door.',
    options: [
      {
        title: 'Snoop in an old chest',
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
    description: 'In the catacombs on the wall, you notice a strange brick, maybe it will open something.',
    options: [
      {
        title: 'Examine the suspicious brick in the wall',
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
    description: 'Nobody has been here for a long time, but it’s possible to find something.',
    options: [
      {
        title: 'Chek under the bed.',
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
    description: 'You entered the tomb of the ancient demon Sindorai and it looks like he is not very pleased with this.',
    options: [
      {
        title: 'Eliminate the demon',
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
    description: 'Outside you were met by the prince of a village nearby, in which Durotan was constantly atrocious. In gratitude, he gives you a residence permit in his village',
    options: [
      {
        title: 'Accept his gift',
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
};

const game = {
  currentLocation: locations.Village,
  inventory: [],
};


function takeItem(item) {
  write(`${item} picked up!\n`);
  game.inventory.push(item);
  write('Your inventory:');
  write(game.inventory);
  write('\n');
}

function goAhead(where) {
  write(`You are in the ${where}\n`);
  game.currentLocation = locations[where];
}

module.exports = game;

