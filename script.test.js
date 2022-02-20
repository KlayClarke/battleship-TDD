import { shipFactory, gameBoard } from "./script";

let gameboard = gameBoard();
let shipOne = shipFactory();
let shipTwo = shipFactory();
shipOne.topLeftCornerCoord = [2, 7];
shipTwo.topLeftCornerCoord = [4, 2];
gameboard.addShip(shipOne);
gameboard.addShip(shipTwo);

test("test ship is sunk", () => {
  expect(shipOne.isSunk()).toBe(false);
});

test("test ship dimension", () => {
  expect(shipTwo.dimensions).toBe(4);
});

test("test add ship", () => {
  expect(gameboard.ships).toEqual([
    [shipOne, [2, 7]],
    [shipTwo, [4, 2]],
  ]);
});

test("test ship hit", () => {
  shipOne.hit([10, 10]);
  expect(shipOne.positionsHit).toEqual([[10, 10]]);
});

test("test gameboard dimensions", () => {
  expect(gameboard.dimensions).toEqual([10, 10]);
});

test("test gameboard change dimensions mechanic ", () => {
  gameboard.changeDimensions(15, 15);
  expect(gameboard.dimensions).toEqual([15, 15]);
});

// only have to test objects public interface (methods and properties that are used out of the ship object / interact with code out of the object)
