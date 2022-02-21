import { shipFactory, gameBoard } from "./script";
import { checkUserShipPosition, cpuShipPositionRandom } from "./mocks";

let gameboard = gameBoard(10, 10);
let cpuShip = shipFactory(4, 1);
let userShip = shipFactory(4, 1);
gameboard.addShip(cpuShip);
gameboard.addShip(userShip);

test("test ship factory add initial position", () => {
  cpuShip.setInitialPosition(37);
  expect(cpuShip.initalPosition).toBe(37);
});

test("test board check user position", () => {
  userShip.setInitialPosition(35);
  expect(gameboard.checkUserShipPosition()).toBe(false);
});

test("test ship dimensions are equal", () => {
  expect(cpuShip.dimensions).toEqual(userShip.dimensions);
});

test("test ship dimensions are correct", () => {
  expect(userShip.dimensions).toEqual([4, 1]);
});

test("user ship positioned in cpu territory", () => {
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

test("user ship positioned slightly out of user territory", () => {
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

test("user ship positioned within bounds of user territory", () => {
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

test("check for cpu ship position randomization min (must equal 1 not 0)", () => {
  let randoms = [];
  for (let i = 0; i < 10000; i++) {
    let random = cpuShipPositionRandom(4, 10, 10);
    randoms.push(random);
  }

  randoms.sort(function (a, b) {
    return a - b;
  });

  console.log(randoms[0]);
  expect(randoms[0]).toBe(1);
});

test("check for cpu ship position randomization max (must be equal to 50 on 10x10 board)", () => {
  let randoms = [];
  for (let i = 0; i < 10000; i++) {
    let random = cpuShipPositionRandom(4, 10, 10);
    randoms.push(random);
  }

  randoms.sort(function (a, b) {
    return a - b;
  });
  expect(randoms[9898]).toBe(50);
});

test("check if cpu ship position randomization is always within cpu territory", () => {
  let boardLength = 10;
  let shipLength = 4;

  // if any numbers in randoms are not in cputerritory grids, means that randomization is not always within cpu territory
  // return false, else true
  function testBounds() {
    for (let i = 0; i < 10000; i++) {
      let num = cpuShipPositionRandom(4, 10, 10);
      if (num > 0 && num < 51) {
        if (
          (num.toString().length == 1 &&
            num <= boardLength - (shipLength - 1)) ||
          (num.toString()[1] <= boardLength - (shipLength - 1) &&
            num.toString()[1] > 0)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  expect(testBounds()).toBe(true);
});
