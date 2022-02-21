// create player
// the game is played against computer - make cpu capable of random plays
// ai doesn't have to be intelligent, but must know whether a move is legal ('maybe log previously used coords and make sure they are only used once')

// create main game loop
// create module for DOM interaction

// game loop sets up new game by creating Players and Gameboards
// first, just populate each gameboard with predetermined coords - later we can allow player to place ship
// should displat both players boards and render them using info from gameboards

// allow user to click on coord in enemy gameboard to attack

// game loop should step through function turn by turn using only methods from other objects

// create conditions so a game ends once a ship sinks - notify the user of the result (place as function in Game module)

// for ai, after ai hits user, ai should send weapon to spot near previously hit spot

const gameBoard = (l, w) => {
  const board = {};

  board.length = l;
  board.width = w;

  board.dimensions = [board.length, board.width];

  board.ships = [];

  board.missedAttackCoords = [];

  board.addShip = function (ship) {
    this.ships.push(ship);
  };

  board.checkUserShipPosition = function (
    shipLength,
    shipInitialPosition,
    boardLength,
    boardWidth
  ) {
    return shipInitialPosition > (boardLength * boardWidth) / 2 &&
      parseInt(shipInitialPosition.toString()[1]) <=
        boardLength - (shipLength - 1)
      ? true
      : false;
  };

  board.recieveAttack = function (attackedShip, attackedCoords) {
    attackedShip.positions.contains(attackedCoords)
      ? attackedShip.hit(attackedCoords)
      : this.missedAttackCoords.push(attackedCoords);
  };

  return board;
};

const shipFactory = (length, width) => {
  const ship = {};

  ship.length = length;
  ship.width = width;

  ship.dimensions = [ship.length, ship.width];

  ship.initalPosition;

  // a list of each grid that contains a piece of this ship
  ship.allPositions = [];

  // the initial placement of ship - more specifically, where the ship's top left corner is placed
  ship.setInitialPosition = function (pos) {
    this.initalPosition = pos;
  };

  // to populate all positions with each grid item that the ship is within
  ship.setAllPositions = function () {
    for (
      let i = this.initalPosition;
      i < this.initalPosition + this.length;
      i++
    ) {
      this.allPositions.push(i);
    }
  };

  // every time a ship's position is hit, decrease length by one and log position
  ship.hit = function (pos) {
    this.allPositions.includes(pos)
      ? (this.allPositions = this.allPositions.filter(
          (position) => position != pos
        ))
      : null;
  };

  // if ship has no positions left, it has sunk - return true, else false
  ship.isSunk = function () {
    return this.allPositions.length == 0 ? true : false;
  };

  ship.randomizeCPUShipPosition = function (
    shipLength,
    boardLength,
    boardWidth
  ) {
    let max = (boardLength * boardWidth) / 2;
    let randomInt = Math.floor(Math.random() * max) + 1;

    // make sure random int is within cpu territory bounds
    // check for 1 digit nums
    // check for 2 digit nums

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

    this.initalPosition = randomInt;
  };

  return ship;
};

module.exports = {
  gameBoard,
  shipFactory,
};
