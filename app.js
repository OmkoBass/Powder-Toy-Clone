const materials = {
  void: 0,
  wall: 1,
  sand: 2,
};

let selected = materials.sand;

class Tile {
  constructor(position) {
    this.position = position;
    this.type = materials.void;
    this.toClear = false;
  }
}

const sizeX = 160;
const sizeY = 120;
const size = 5;

let grid = [];

function handleSwitchMaterial(material) {
  selected = materials[material];

  if (selected === materials.wall) {
  }
}

function preload() {
  grid = Array(sizeX)
    .fill()
    .map((_, i) =>
      Array(sizeY)
        .fill()
        .map((_, j) => new Tile(i, j))
    );

  for (i = 0; i < sizeX; i++) {
    for (j = 0; j < sizeY; j++) {
      if (i === 0) {
        grid[i][j].type = materials.wall;
      } else if (i === sizeX - 1) {
        grid[i][j].type = materials.wall;
      } else if (j === sizeY - 1) {
        grid[i][j].type = materials.wall;
      }
    }
  }
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);

  let i = 0;

  for (i = sizeX - 1; i >= 0; i--) {
    for (j = sizeY - 1; j >= 0; j--) {
      // Clear the previous iteration particles
      if (grid[i][j].toClear === true) {
        grid[i][j].type = materials.void;
        grid[i][j].toClear = false;
      }

      // Moving of the particles
      if (grid[i][j].type === materials.sand) {
        if (grid[i][j + 1].type === materials.void) {
          grid[i][j + 1].type = materials.sand;
          grid[i][j].toClear = true;
        } else if (
          grid[i - 1][j + 1].type === materials.void &&
          grid[i - 1][j].type === materials.void
        ) {
          grid[i - 1][j + 1].type = materials.sand;
          grid[i][j].toClear = true;
        } else if (
          grid[i + 1][j + 1].type === materials.void &&
          grid[i + 1][j].type === materials.void
        ) {
          grid[i + 1][j + 1].type = materials.sand;
          grid[i][j].toClear = true;
        }
      }

      // Filling the particles
      if (grid[i][j].type === materials.wall) {
        fill(255);
        rect(i * size, j * size, size, size);
      } else if (grid[i][j].type === materials.sand) {
        fill(255, 255, 0);
        rect(i * size, j * size, size, size);
      } else if (grid[i][j].toClear) {
        fill(255, 255, 0);
        rect(i * size, j * size, size, size);
      }
    }
  }
}

function mousePressed() {
  const coordinateX = Math.floor(mouseX / size);
  const coordinateY = Math.floor(mouseY / size);

  if (
    coordinateX >= 0 &&
    coordinateX <= sizeX &&
    coordinateY >= 0 &&
    coordinateY <= sizeY
  ) {
    if (grid[coordinateX][coordinateY].type === materials.void) {
      grid[coordinateX][coordinateY].type = selected;
    }
  }
}

function mouseDragged() {
  const coordinateX = Math.floor(mouseX / size);
  const coordinateY = Math.floor(mouseY / size);

  if (
    coordinateX >= 0 &&
    coordinateX <= sizeX &&
    coordinateY >= 0 &&
    coordinateY <= sizeY
  ) {
    if (grid[coordinateX][coordinateY].type === materials.void) {
      grid[coordinateX][coordinateY].type = selected;
    }
  }
}
