import { gameBoard, shipFactory } from "./script";

const grid = document.querySelector(".grid-container");
const replayButton = document.querySelector("button");

// must clear gameboard grid before replaying
// pop up modal with results of current match and replay button
// randomize ai hits - if ai hits user, encourage ai to hit in spots beside recent hit
//// if ai hits user at 76, ai should hit for nums in that range (71 - 80)

function play() {
  // create gameboard
  let gameboard = gameBoard(10, 10);

  // create cpu ship and usership from factory
  let cpuShip = shipFactory(4, 1);
  let userShip = shipFactory(4, 1);

  // add ships to gameboard
  gameboard.addShip(cpuShip);
  gameboard.addShip(userShip);

  // randomize cpu ship initial position
  cpuShip.randomizeCPUShipPosition(
    cpuShip.length,
    gameboard.length,
    gameboard.width
  );

  // populate cpu ship's 'all positions' param
  cpuShip.setAllPositions();
  console.log(cpuShip);

  // set user ship initial position (will take user input for this)
  userShip.setInitialPosition(72);

  // populate user ship's 'all positions' param
  userShip.setAllPositions();
  console.log(userShip);

  // function for gameboard grid creation / setting of dmz line
  function createGrid() {
    for (
      let i = 0;
      i < gameboard.dimensions[1] * gameboard.dimensions[0];
      i++
    ) {
      const div = document.createElement("div");
      div.setAttribute("id", `${i + 1}`);
      grid.style.gridTemplateColumns = `repeat(${gameboard.dimensions[1]}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${gameboard.dimensions[0]}, 1fr)`;
      grid.appendChild(div).classList.add("grid-item");
    }
  }
  // create an initial grid for gameboard
  createGrid();

  // a nodelist of all grid items within gameboard grid
  const gridItems = document.querySelectorAll(".grid-item");

  // display id numbers for each grid
  for (let item of gridItems) {
    item.innerText = item.id;
  }

  // set middle boundary line
  let dmzLine = (gameboard.dimensions[0] * gameboard.dimensions[1]) / 2 + 1;

  // to add middle boundary line between top and bottom half of gameboard
  for (let item of gridItems) {
    item.id >= dmzLine && item.id < dmzLine + gameboard.dimensions[0]
      ? (item.style.borderTop = "5px solid red")
      : null;
  }

  // to disable grids within users bounds
  for (let item of gridItems) {
    item.id >= dmzLine
      ? item.classList.add("disable")
      : item.classList.add("target");
  }

  // to mark successful ship hits on grid
  function markShipHit(id) {
    for (let item of gridItems) {
      if (item.id == id) {
        item.innerHTML = "X";
        item.classList.add("hit");
      }
    }
  }

  // if grid item id in cpuShip position, register hit
  // else handle wrong hit, disallow a hit in same spot - mark hit spots by using X
  function registerHitAttempt(e) {
    // all cpu ship positions prior to attempted hit
    let positions = cpuShip.allPositions;
    // send hit
    cpuShip.hit(parseInt(e.target.id));
    // all cpu positions after attempted hit
    let newPositions = cpuShip.allPositions;
    // if hit is successful, register hit
    if (positions.length > newPositions.length) {
      //   markShipHit(e.target.id);
      console.log("ship hit");
      markShipHit(e.target.id);
    }
    // if cpu ship is sunk, REGISTER GAME END
    if (gameOver()) {
      console.log("game over");
      gameOverDisplay();
    }
  }

  // check for ship sunk (either user or cpu) - return true if true
  function gameOver() {
    if (cpuShip.isSunk() || userShip.isSunk()) {
      return true;
    }
    return false;
  }

  // only to be run if gameOver() - checks for winner and displays results
  function gameOverDisplay() {
    // if cpu ship sunk / user wins
    if (cpuShip.isSunk()) {
      // congratulate user
      console.log("congratulations user");
    } else if (userShip.isSunk()) {
      // cheer user up
      console.log("sucks to be u");
    }
  }

  // for each grid item, on click register hit attempt on cpu ship
  gridItems.forEach((item) =>
    item.addEventListener("click", registerHitAttempt)
  );
}

function replay() {
  play();
}

play();

replayButton.addEventListener("click", replay);
