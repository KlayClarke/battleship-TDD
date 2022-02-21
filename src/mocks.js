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
  while (
    !(
      randomInt > 0 &&
      randomInt <= max &&
      (randomInt.toString().length == 1 ||
        parseInt(randomInt.toString()[1]) <= boardLength - (shipLength - 1))
    )
  ) {
    randomInt = Math.floor(Math.random() * max) + 1;
  }
  return randomInt;
}

module.exports = {
  checkUserShipPosition,
  cpuShipPositionRandom,
};
