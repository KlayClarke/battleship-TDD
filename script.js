const gameBoard = (l, w) => {
  const board = {};

  board.length = l;
  board.width = w;

  board.dimensions = [board.length, board.width];

  board.ships = [];

  board.missedAttackCoords = [];

  board.addShip = function (ship) {
    this.ships.push([ship, ship.topLeftCornerCoord]);
  };

  board.checkPositions = function () {
    let shipOne = this.ships[0];
    let shipTwo = this.ships[1];
    let shipOneLength = shipOne[0]["length"];
    let shipOneWidth = shipOne[0]["width"];
    let shipTwoLength = shipTwo[0]["length"];
    let shipTwoWidth = shipTwo[0]["width"];
    let shipOneTopLeftCornerX = shipOne[0]["topLeftCornerCoord"][0];
    let shipOneTopLeftCornerY = shipOne[0]["topLeftCornerCoord"][1];
    let shipTwoTopLeftCornerX = shipTwo[0]["topLeftCornerCoord"][0];
    let shipTwoTopLeftCornerY = shipTwo[0]["topLeftCornerCoord"][1];

    // check shipOne x coord: must be between 1 and board length - (ship length - 1)
    if (
      !(
        shipOneTopLeftCornerX >= 1 &&
        shipOneTopLeftCornerX <= this.length - (shipOneLength - 1)
      )
    ) {
      console.log("Ship One X");
      return false;
    }

    // check shipOne y coord: must be between 1 and board width / 2 - (ship width - 1)
    if (
      !(
        shipOneTopLeftCornerY >= 1 &&
        shipOneTopLeftCornerY <= this.width / 2 - (shipOneWidth - 1)
      )
    ) {
      console.log("Ship One Y");
      return false;
    }

    // check shiptwo x coord - between 1 and board length - (ship length - 1)
    if (
      !(
        shipTwoTopLeftCornerX >= 1 &&
        shipTwoTopLeftCornerX <= this.length - (shipTwoLength - 1)
      )
    ) {
      console.log("Ship Two X");
      return false;
    }

    // check shiptwo y coord - between (board width / 2) + 1 and board width - (ship width - 1)
    if (
      !(
        shipTwoTopLeftCornerY > this.width / 2 &&
        shipTwoTopLeftCornerY <= this.width - (shipTwoWidth - 1)
      )
    ) {
      console.log("Ship Two Y");
      return false;
    }

    return true;
  };

  board.recieveAttack = function (attackedShip, attackedCoords) {
    attackedShip.positions.contains(attackedCoords)
      ? attackedShip.hit(attackedCoords)
      : this.missedAttackCoords.push(attackedCoords);
  };

  board.changeDimensions = function (newLength, newWidth) {
    board.length = newLength;
    board.width = newWidth;
    board.dimensions = [board.length, board.width];
  };

  return board;
};

const shipFactory = (l, w) => {
  const ship = {};

  ship.length = l;
  ship.width = w;

  ship.dimensions = [ship.length, ship.width];

  ship.topLeftCornerCoord = [];

  ship.positions = [];

  ship.positionsHit = [];
  // every time a position hit is one where ship is present, decrease length by one and log position

  ship.hit = function (pos) {
    this.positions.includes(pos) ? this.positionsHit.push(pos) : null;
  };

  ship.isSunk = function () {
    return this.length == 0 ? true : false;
  };

  return ship;
};

function checkShipOnePosition(
  shipOneLength,
  shipOneWidth,
  shipOneX,
  shipOneY,
  boardLength,
  boardWidth
) {
  // check shipOne x coord: must be between 1 and board length - (ship length - 1)
  if (!(shipOneX >= 1 && shipOneX <= boardLength - (shipOneLength - 1))) {
    console.log("Ship One X");
    return false;
  }

  // check shipOne y coord: must be between 1 and board width / 2 - (ship width - 1)
  if (!(shipOneY >= 1 && shipOneY <= boardWidth / 2 - (shipOneWidth - 1))) {
    console.log("Ship One Y");
    return false;
  }

  return true;
}

function checkShipTwoPosition(
  shipTwoLength,
  shipTwoWidth,
  shipTwoX,
  shipTwoY,
  boardLength,
  boardWidth
) {
  // check shiptwo x coord - between 1 and board length - (ship length - 1)
  if (!(shipTwoX >= 1 && shipTwoX <= boardLength - (shipTwoLength - 1))) {
    console.log("Ship Two X");
    return false;
  }

  // check shiptwo y coord - between (board width / 2) + 1 and board width - (ship width - 1)
  if (
    !(shipTwoY > boardWidth / 2 && shipTwoY <= boardWidth - (shipTwoWidth - 1))
  ) {
    console.log("Ship Two Y");
    return false;
  }
  return true;
}

module.exports = {
  gameBoard,
  shipFactory,
  checkShipOnePosition,
  checkShipTwoPosition,
};

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

// don't console log or use DOM to test code, strictly Jest
