import { shipFactory, gameBoard } from "./script";
import { checkUserShipPosition, cpuShipPositionRandom } from "./mocks";

// mock initialization start

let gameboard = gameBoard(10, 10);
let cpuShip = shipFactory(4, 1);
let userShip = shipFactory(4, 1);
gameboard.addShip(cpuShip);
gameboard.addShip(userShip);

cpuShip.setInitialPosition(37);
cpuShip.setAllPositions();

userShip.setInitialPosition(75);
userShip.setAllPositions();

// mock initialization end

test("test ship dimensions are equal", () => {
  expect(cpuShip.dimensions).toEqual(userShip.dimensions);
});

test("test ship dimensions are correct", () => {
  expect(userShip.dimensions).toEqual([4, 1]);
});

test("test ship factory set initial position", () => {
  cpuShip.setInitialPosition(37);
  expect(cpuShip.initalPosition).toBe(37);
});

test("test board check user position for position in legal spot", () => {
  userShip.setInitialPosition(65);
  expect(gameboard.checkUserShipPosition()).toBe(false);
});

test("test user ship positioned in cpu territory", () => {
  userShip.setInitialPosition(12);
  expect(
    checkUserShipPosition(
      userShip.length,
      userShip.initalPosition,
      gameboard.length,
      gameboard.width
    )
  ).toBe(false);
});

test("test user ship positioned slightly out of user territory", () => {
  userShip.setInitialPosition(78);
  expect(
    checkUserShipPosition(
      userShip.length,
      userShip.initalPosition,
      gameboard.length,
      gameboard.width
    )
  ).toBe(false);
});

test("test user ship positioned within bounds of user territory", () => {
  userShip.setInitialPosition(66);
  expect(
    checkUserShipPosition(
      userShip.length,
      userShip.initalPosition,
      gameboard.length,
      gameboard.width
    )
  ).toBe(true);
});

test("test for cpu ship position randomization min (must equal 1 not 0)", () => {
  let randoms = [];
  for (let i = 0; i < 100000; i++) {
    let random = cpuShipPositionRandom(
      cpuShip.length,
      gameboard.length,
      gameboard.width
    );
    randoms.push(random);
  }

  randoms.sort(function (a, b) {
    return a - b;
  });

  expect(randoms[0]).toBe(1);
});

test("test for cpu ship position randomization max (must be equal to 50 on 10x10 board)", () => {
  let randoms = [];
  for (let i = 0; i < 100000; i++) {
    let random = cpuShipPositionRandom(
      cpuShip.length,
      gameboard.length,
      gameboard.width
    );
    randoms.push(random);
  }

  randoms.sort(function (a, b) {
    return a - b;
  });

  expect(randoms[99999]).toBe(47);
});

test("test if cpu ship position randomization returns legal positions", () => {
  function testBounds() {
    for (let i = 0; i < 10000; i++) {
      let randomNum = cpuShipPositionRandom(
        cpuShip.length,
        gameboard.length,
        gameboard.width
      );
      // check that cpu random position is within cpu territory bounds
      if (randomNum < 0 || randomNum > 50) {
        return false;
      }
      // if random pos is 1 digit and the position is greater than board length - (ship length - 1), return false
      // means that the ship will be hanging off edge of gameboard
      if (
        randomNum.toString().length == 1 &&
        randomNum > gameboard.length - (cpuShip.length - 1)
      ) {
        return false;
      }
      // if random pos it 2 digits and the second digit is greater than board length - (ship length - 1), return false
      // means that the ship will be hanging off edge of gameboard
      if (
        randomNum.toString().length > 1 &&
        randomNum.toString()[1] > gameboard.length - (cpuShip.length - 1)
      ) {
        return false;
      }
    }
    // if all aforementioned tests pass for each num, it is safe to say that our cpu position randomizer func returns
    // positions that are within the cpu's territory bounds AND are legal positions for the game of battleship
    return true;
  }

  expect(testBounds()).toBe(true);
});

test("test to ensure cpu randomization doesnt return two digit nums ending in 0", () => {
  function test() {
    for (let i = 0; i < 10000; i++) {
      let num = cpuShipPositionRandom(
        cpuShip.length,
        gameboard.length,
        gameboard.width
      );

      if (num.toString()[1] == 0 && num.toString()[1] !== undefined) {
        return false;
      }
    }
    return true;
  }
  expect(test()).toBe(true);
});

test("test set all positions param on ship factory of cpu", () => {
  expect(cpuShip.allPositions).toEqual([37, 38, 39, 40]);
});

test("test set all positions param on ship factory of user", () => {
  expect(userShip.allPositions).toEqual([75, 76, 77, 78]);
});

test("test ship hit function on user ship", () => {
  userShip.hit(76);
  expect(userShip.allPositions).toEqual([75, 77, 78]);
});

test("test ship hit function on cpu ship", () => {
  cpuShip.hit(38);
  cpuShip.hit(39);
  expect(cpuShip.allPositions).toEqual([37, 40]);
});

test("test ship is sunk for cpu ship with all positions undamaged", () => {
  expect(cpuShip.isSunk()).toBe(false);
});

test("test ship is sunk for user ship with all positions hit", () => {
  userShip.hit(75);
  userShip.hit(76);
  userShip.hit(77);
  userShip.hit(78);
  expect(userShip.isSunk()).toBe(true);
});
