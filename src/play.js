import { gameBoard, shipFactory } from "./script";

const grid = document.querySelector(".grid-container");
const directionsContainer = document.querySelector("#directions");
const replayButton = document.querySelector("button");

function play() {
  let currentTurn = 1;

  let cpuSuccessfulHits = [];
  let cpuAllAttemptedHits = [];

  // clear end result text container - only matters if user is replaying
  directionsContainer.innerHTML = "";
  directionsContainer.style.backgroundColor = "";

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

  // set user ship initial position (will eventually take user input for this)
  userShip.setInitialPosition(72);

  // populate user ship's 'all positions' param
  userShip.setAllPositions();

  // function for gameboard grid creation / setting of dmz line
  function createGrid() {
    grid.innerHTML = "";
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

  // to mark hit attempts on grid - if successful, this style is overrided by markShipHit class
  function markAttemptedHit(id) {
    for (let item of gridItems) {
      if (item.id == id) {
        item.classList.add("attempt");
      }
    }
  }

  // to mark successful ship hits on grid
  function markShipHit(id) {
    for (let item of gridItems) {
      if (item.id == id) {
        item.classList.add("hit");
      }
    }
  }

  // when a grid spot has been hit, remove id num on grid to visually represent this action
  function removeGridLabel(id) {
    for (let grid of gridItems) {
      if (grid.id == id) {
        grid.innerText = "";
      }
    }
  }

  function showUserShipOnGrid() {
    for (let grid of gridItems) {
      for (let pos of userShip.allPositions) {
        if (grid.id == pos) {
          grid.classList.add("user-ship");
        }
      }
    }
  }

  function registerUserHitAttempt(e) {
    // clear targeted grid's id label
    removeGridLabel(e.target.id);
    // mark attempted hit
    markAttemptedHit(e.target.id);
    // all cpu ship positions prior to attempted hit
    let positions = cpuShip.allPositions;
    // send hit
    cpuShip.hit(parseInt(e.target.id));
    // all cpu positions after attempted hit
    let newPositions = cpuShip.allPositions;
    // if hit is successful, register hit
    if (positions.length > newPositions.length) {
      // mark ship hit
      markShipHit(e.target.id);
      // display message explaining result
      directionsContainer.innerText = "you hit the enemy";
    }
    currentTurn++;
    battle();
  }

  function cpuRandomHitAttempt(boardLength, boardWidth) {
    let max = boardLength * boardWidth;
    let random = Math.floor(Math.random() * max) + 1;
    // if cpu has successful hits, hit around the success
    if (cpuSuccessfulHits.length > 0) {
      cpuSuccessfulHits.sort(function (a, b) {
        return a - b;
      });
      while (
        !(
          (random < 101 &&
            random > 50 &&
            random > cpuSuccessfulHits[0] - 6 &&
            random < cpuSuccessfulHits[0] + 6) ||
          (cpuAllAttemptedHits.length && cpuAllAttemptedHits.includes(random))
        )
      ) {
        random = Math.floor(Math.random() * max) + 1;
      }
    } else {
      // if not successful hits
      while (
        !(
          (random < 101 && random > 50) ||
          (cpuAllAttemptedHits.length && cpuAllAttemptedHits.includes(random))
        )
      ) {
        random = Math.floor(Math.random() * max) + 1;
      }
    }
    return random;
  }

  function registerCPUHitAttempt(hitPosition) {
    // clear targeted grid's id label
    removeGridLabel(hitPosition);
    // mark attempted hit
    markAttemptedHit(hitPosition);
    // all user positions prior to attempted hit
    let positions = userShip.allPositions;
    // send hit
    userShip.hit(parseInt(hitPosition));
    // all user positions after attempted hit
    let newPositions = userShip.allPositions;
    // if hit is successful, register hit
    if (positions.length > newPositions.length) {
      // mark ship hit
      markShipHit(hitPosition);
      // push position to cpu successful attempted hits list at head of file
      cpuSuccessfulHits.push(hitPosition);
      // display message explaining result
      directionsContainer.innerText = "you got hit";
    }
    cpuAllAttemptedHits.push(hitPosition);
    currentTurn++;
    battle();
  }

  // check for ship sunk (either user or cpu) - if true - display gameOver
  function isShipSunk() {
    if (cpuShip.isSunk() || userShip.isSunk()) {
      return true;
    }
    return false;
  }

  // only to be run if isShipSunk - checks for winner and displays results
  function gameOverDisplay() {
    // if cpu ship sunk / user wins
    if (cpuShip.isSunk()) {
      // congratulate user
      directionsContainer.innerText = "Congratulations. You Won!";
      // change background color to green (victory)
      directionsContainer.style.backgroundColor = "green";
    } else if (userShip.isSunk()) {
      // cheer user up
      directionsContainer.innerText = "We'll get them next time, champ!";
      // change background color to red (defeat)
      directionsContainer.style.backgroundColor = "red";
    }
  }

  function battle() {
    console.log({ cpuSuccessfulHits, cpuAllAttemptedHits });
    if (isShipSunk()) {
      gameOverDisplay();
    } else {
      if (currentTurn % 2 == 1) {
        // turn is odd, users turn to choose
        directionsContainer.innerText = "Your turn to choose";
        gridItems.forEach((item) =>
          item.addEventListener("click", registerUserHitAttempt)
        );
      } else if (currentTurn % 2 == 0) {
        // turn is even, cpu turn to choose
        directionsContainer.innerText = "Enemy's turn to attack";
        setTimeout(function () {
          let hitPosition = cpuRandomHitAttempt(
            gameboard.length,
            gameboard.width
          );
          registerCPUHitAttempt(hitPosition);
        });
      }
    }
  }

  // create an initial grid for gameboard
  createGrid();

  // display user position on grid
  showUserShipOnGrid();

  battle();
}

// initial play on pageload
play();

// function that reruns play function
function replay() {
  play();
}

// when replay button clicked, replay
replayButton.addEventListener("click", replay);
