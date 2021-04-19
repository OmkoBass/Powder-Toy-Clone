const materials = {
  void: 0,
  wall: 1,
  sand: 2,
  fluid: 3,
};

let selected = materials.sand;

class Tile {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.type = materials.void;
    this.toClear = false;
    this.thickness = 0;
    this.velocity = 1;
  }

  // Returns true if nothing is below
  BoundsBelow() {
    if (grid[this.i][this.j + 1].type === materials.void) {
      return true;
    }
    return false;
  }

  // Returns true if nothing is bottom left
  BoundsBottomLeft() {
    if (
      grid[this.i - 1][this.j + 1].type === materials.void &&
      grid[this.i - 1][this.j].type === materials.void
    ) {
      return true;
    }
    return false;
  }

  // Returns true if nothing is bottom right
  BoundsBottomRight() {
    if (
      grid[this.i + 1][this.j + 1].type === materials.void &&
      grid[this.i + 1][this.j].type === materials.void
    ) {
      return true;
    }
    return false;
  }

  BoundsLeft() {
    if (grid[this.i - 1][this.j].type === materials.void) {
      return true;
    }
    return false;
  }

  BoundsRight() {
    if (grid[this.i + 1][this.j].type === materials.void) {
      return true;
    }
    return false;
  }

  changeToSand() {}

  simulate() {
    // Moving of the particles
    if (this.type === materials.sand) {
      if (grid[this.i][this.j].type === materials.sand) {
        if (this.BoundsBelow()) {
          grid[this.i][this.j + 1].type = materials.sand;
          grid[this.i][this.j].toClear = true;
        } else if (this.BoundsBottomLeft()) {
          grid[this.i - 1][this.j + 1].type = materials.sand;
          grid[this.i][this.j].toClear = true;
        } else if (this.BoundsBottomRight()) {
          grid[this.i + 1][this.j + 1].type = materials.sand;
          grid[this.i][this.j].toClear = true;
        }
      }
    } else if (this.type === materials.fluid) {
      // Moving of liquids
      if (grid[this.i][this.j].type === materials.fluid) {
        if (this.BoundsBelow()) {
          grid[this.i][this.j + 1].type = materials.fluid;
          grid[this.i][this.j].toClear = true;
        } else if (this.BoundsBottomLeft()) {
          grid[this.i - 1][this.j + 1].type = materials.fluid;
          grid[this.i][this.j].toClear = true;
        } else if (this.BoundsBottomRight()) {
          grid[this.i + 1][this.j + 1].type = materials.fluid;
          grid[this.i][this.j].toClear = true;
        } else if (this.BoundsLeft()) {
          grid[this.i - 1][this.j].type = materials.fluid;
          grid[this.i][this.j].toClear = true;
        } else if (this.BoundsRight()) {
          grid[this.i + 1][this.j].type = materials.fluid;
          grid[this.i][this.j].toClear = true;
        }
      }
    }
  }

  draw() {
    // Filling the particles
    if (grid[this.i][this.j].type === materials.wall) {
      fill(255);
      rect(this.i * size, this.j * size, size, size);
    } else if (grid[this.i][this.j].type === materials.sand) {
      fill(255, 255, 0);
      rect(this.i * size, this.j * size, size, size);
    } else if (grid[this.i][this.j].type === materials.fluid) {
      fill(0, 0, 255);
      rect(this.i * size, this.j * size, size, size);
    } else if (grid[this.i][this.j].toClear) {
      fill(255, 255, 0);
      rect(this.i * size, this.j * size, size, size);
    }
  }
}

const sizeX = 160;
const sizeY = 120;
const size = 5;

let grid = [];

function handleSwitchMaterial(material) {
  selected = materials[material];
}

function handleResetGrid() {
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

function preload() {
  handleResetGrid();
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

      grid[i][j].simulate();
      grid[i][j].draw();
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
