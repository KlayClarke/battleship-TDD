// init gameboard
// init ship one
// push ship to gameboard
// init ship two
// push ship to gameboard

// gameboard factory
// gameboard should be able to place ships at specific coords by calling ship factory
// gameboard should have a recieveAttack() function that takes a pair of coords, determines whether the attack hit a ship, sends the hit function if hit || records coords of missed shot
// gameboard should keep track of missed attacks so they can display them properly
// gameboard should be able to report whether or not all of their ships have been sunk

const gameBoard = () => {
  const board = {};

  board.dimensions = [10, 10];

  board.ships = [];

  board.missedAttackCoords = [];

  board.addShip = function (ship) {
    this.ships.push([ship, ship.topLeftCornerCoord]);
  };

  board.recieveAttack = function (attackedShip, attackedCoords) {
    attackedShip.positions.contains(attackedCoords)
      ? attackedShip.hit(attackedCoords)
      : this.missedAttackCoords.push(attackedCoords);
  };

  board.changeDimensions = function (newLength, newWidth) {
    board.dimensions = [newLength, newWidth];
  };

  return board;
};

const shipFactory = () => {
  const ship = {};

  ship.length = 4;
  ship.width = 1;
  ship.dimensions = ship.length * ship.width;

  ship.topLeftCornerCoord = [];
  ship.positions = [];

  ship.positionsHit = [];
  // every time a position hit is one where ship is present, decrease length by one and log position

  ship.hit = function (pos) {
    this.positionsHit.push(pos);
  };

  ship.isSunk = function () {
    return this.length == 0 ? true : false;
  };

  return ship;
};

let gameboard = gameBoard();
let shipOne = shipFactory();
let shipTwo = shipFactory();

gameboard.addShip(shipOne, 2, 7);
gameboard.addShip(shipTwo, 4, 2);

console.log(gameboard.ships);

module.exports = {
  gameBoard,
  shipFactory,
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
