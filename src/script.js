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

  ship.initalPosition = 0;

  // a list of each grid that contains a piece of this ship
  ship.allPositions = [];

  // a list of all positions hit
  ship.positionsHit = [];

  // the initial placement of ship - more specifically, where the ship's top left corner is placed
  ship.setInitialPosition = function (pos) {
    this.initalPosition = pos;
  };

  // every time a ship's position is hit, decrease length by one and log position
  ship.hit = function (pos) {
    this.positions.includes(pos) ? this.positionsHit.push(pos) : null;
    this.positions.filter((position) => position != pos);
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

    // algo gets random numbers until they meet the criteria below, then returns current random num as cpu randomized pos
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
  };

  return ship;
};

module.exports = {
  gameBoard,
  shipFactory,
};
