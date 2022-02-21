const { random } = require("lodash");

function checkUserShipPosition( // user ship
  shipLength,
  shipInitialPosition,
  boardLength,
  boardWidth
) {
  // on a 10x10 grid
  // ships with 4x1 dimensions
  // check init pos make sure it is greater than 51 ((10*10 / 2) + 1) and its second number is less than 8 (10*10 - (shiplength - 1))
  return shipInitialPosition > (boardLength * boardWidth) / 2 &&
    shipInitialPosition <= boardLength * boardWidth &&
    parseInt(shipInitialPosition.toString()[1]) <=
      boardLength - (shipLength - 1)
    ? true
    : false;
}

function cpuShipPositionRandom(shipLength, boardLength, boardWidth) {
  let max = (boardLength * boardWidth) / 2;
  let randomInt = Math.floor(Math.random() * max) + 1;

  // make sure random int is within cpu territory bounds

  while (
    // check for 1 digit nums - if 1 digit, must be less than or equal to board length - (ship length - 10)
    (randomInt.toString().length == 1 &&
      randomInt > boardLength - (shipLength - 1)) ||
    randomInt.toString()[1] == 0 ||
    // check for 2 digit nums - if 2 digit, 2nd digit must be less than or equal to board length - (ship length - 10)
    (randomInt.toString().length > 1 &&
      parseInt(randomInt.toString()[1]) > boardLength - (shipLength - 1))
  ) {
    randomInt = Math.floor(Math.random() * max) + 1;
  }

  return randomInt;
}

module.exports = {
  checkUserShipPosition,
  cpuShipPositionRandom,
};
