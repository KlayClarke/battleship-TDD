const grid = document.querySelector(".grid-container");

// dimensions must be even always - only give options for 20 or less

let dimensions = [10, 10];

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

function registerGridItemClick(e) {
  console.log(e.target.id);
}

// create an initial grid for gameboard
createGrid();

const gridItems = document.querySelectorAll(".grid-item");

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
