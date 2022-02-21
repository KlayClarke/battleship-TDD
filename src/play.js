import { gameBoard, shipFactory } from "./script";

const grid = document.querySelector(".grid-container");
const textContainer = document.querySelector("#text");

// dimensions must be even always - only give options for between 10 and 20
// large map = [12,12]  --> ship sizes = 5 x 2
// small map = [8,8] --> ship sizes = 4 x 1

export function play() {
  let gameboard = gameBoard(10, 10);
  let cpuShip = shipFactory(4, 1);
  let userShip = shipFactory(4, 1);
  gameboard.addShip(cpuShip);
  gameboard.addShip(userShip);

  // check user position before creating and placing ship
  // for user position, check -- for cpu position, use a similar function to randomize
  // allow fn to be called and return a logically sound initial position for cpu

  let dimensions = gameboard.dimensions;

  let dmzLine = (dimensions[0] * dimensions[1]) / 2 + 1;

  function createGrid() {
    for (let i = 0; i < dimensions[1] * dimensions[0]; i++) {
      const div = document.createElement("div");
      div.setAttribute("id", `${i + 1}`);
      grid.style.gridTemplateColumns = `repeat(${dimensions[1]}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${dimensions[0]}, 1fr)`;
      grid.appendChild(div).classList.add("grid-item");
    }
  }

  // if grid item id in cpuShip position, register hit
  // else handle wrong hit, disallow a hit in same spot - mark hit spots by using X
  function registerGridItemClick(e) {
    console.log(e.target.id);
  }

  // create an initial grid for gameboard
  createGrid();

  const gridItems = document.querySelectorAll(".grid-item");

  // display id numbers for each grid
  for (let item of gridItems) {
    item.innerText = item.id;
  }

  // to add a boundary line between top and bottom half of gameboard
  for (let item of gridItems) {
    item.id >= dmzLine && item.id < dmzLine + dimensions[0]
      ? (item.style.borderTop = "5px solid red")
      : null;
  }

  // to disable grids within users bounds
  for (let item of gridItems) {
    item.id >= dmzLine
      ? item.classList.add("disable")
      : item.classList.add("target");
  }

  // for each grid item, on click return item num as id
  gridItems.forEach((item) =>
    item.addEventListener("click", registerGridItemClick)
  );

  // if id is single digit number, on first row
  // if id is triple digit number, on 10th row
}