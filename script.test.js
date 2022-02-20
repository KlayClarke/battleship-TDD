import { shipFactory, gameBoard, mockPositionCheck } from "./script";
import { checkShipOnePosition, checkShipTwoPosition } from "./script";

let gameboard = gameBoard(10, 10);
let shipOne = shipFactory(4, 1);
let shipTwo = shipFactory(4, 1);
shipOne.topLeftCornerCoord = [5, 1];
shipTwo.topLeftCornerCoord = [1, 5];
gameboard.addShip(shipOne);
gameboard.addShip(shipTwo);

test("test ship is sunk", () => {
  expect(shipOne.isSunk()).toBe(false);
});

test("test ship dimension", () => {
  expect(shipTwo.dimensions).toEqual([4, 1]);
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

test("test position of small ship one for 20 x 20 grid", () => {
  let shipL = 5;
  let shipW = 1;
  let shipX = 4;
  let shipY = 1;
  let boardL = 20;
  let boardW = 20;
  expect(checkShipOnePosition(shipL, shipW, shipX, shipY, boardL, boardW)).toBe(
    true
  );
});

test("test position of small ship one for 20 x 20 grid", () => {
  let shipL = 5;
  let shipW = 2;
  let shipX = 1;
  let shipY = 11;
  let boardL = 20;
  let boardW = 20;
  expect(checkShipTwoPosition(shipL, shipW, shipX, shipY, boardL, boardW)).toBe(
    true
  );
});

test("test position of big ship one touching border of 100 x 100 grid", () => {
  let shipL = 13;
  let shipW = 10;
  let shipX = 88;
  let shipY = 41;
  let boardL = 100;
  let boardW = 100;
  expect(checkShipOnePosition(shipL, shipW, shipX, shipY, boardL, boardW)).toBe(
    true
  );
});

test("test position of big ship two touching border of 100 x 100 grid", () => {
  let shipL = 20;
  let shipW = 2;
  let shipX = 81;
  let shipY = 51;
  let boardL = 100;
  let boardW = 100;
  expect(checkShipTwoPosition(shipL, shipW, shipX, shipY, boardL, boardW)).toBe(
    true
  );
});
