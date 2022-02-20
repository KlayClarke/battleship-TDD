const grid = document.querySelector(".grid-container");
console.log(grid);

let dimensions = [10, 10];

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

createGrid();

const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach((item) =>
  item.addEventListener("click", registerGridItemClick)
);
