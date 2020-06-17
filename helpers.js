'use strict';

const isNumeric = text => (!isNaN(text));
const inRange = (x, min, max) => ((x - min) * (x - max) <= 0);

module.exports = {
  isNumeric,
  inRange,
};
