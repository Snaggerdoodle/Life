let res = 25;
let tilesX = 39;
let tilesY = 30;
let tiles = [];
let runLife = 0;
let lifeScore;

//sets up the arrays
function setup() {
  createCanvas(tilesX * res, tilesY * res);
  background(10);
  for (let i = 0; i < tilesX; i++) {
    tiles[i] = [];
    for (let j = 0; j < tilesY; j++) {
      tiles[i][j] = new Tile(res * i, res * j);
    }
  }
}

//draws it
function draw() {
  for (let i = 1; i < tilesX-1; i++) {
    for (let j = 1; j < tilesY-1; j++) {
      tiles[i][j].show();
    }
  }
  if (runLife == 1) {
    life();
  }
}

//determines which tile is being pressed
function mousePressed() {
  for (let i = 0; i < tilesX; i++) {
    for (let j = 0; j < tilesY; j++) {
      if (mouseX > i * res && mouseX < (i + 1) * res && mouseY > j * res && mouseY < (j + 1) * res) {
        tiles[i][j].clicked();
        console.log('Clicked on', i, j);
        console.log('life score' , tiles[i-1][j-1].life + tiles[i][j-1].life + tiles[i+1][j-1].life + tiles[i+1][j].life + tiles[i+1][j+1].life + tiles[i][j+1].life + tiles[i-1][j+1].life + tiles[i-1][j].life);
      }
    }
  }
}

// Calls life
function keyPressed() {
  if (keyCode === ENTER && runLife == 0) {
    runLife = 1;
  }else{
    runLife = 0;
  }
}

// Game of life
function life() {
  for (let i = 1; i < tilesX-1; i++) {
    for (let j = 1; j < tilesY-1; j++) {
      let lifeScore = tiles[i-1][j-1].life + tiles[i][j-1].life + tiles[i+1][j-1].life + tiles[i+1][j].life + tiles[i+1][j+1].life + tiles[i][j+1].life + tiles[i-1][j+1].life + tiles[i-1][j].life;
      if (tiles[i][j].life == 0 && lifeScore == 3) {
        tiles[i][j].life = 1;
      }else if (tiles[i][j].life == 1) {
        if (lifeScore < 2 || lifeScore > 3){
          tiles[i][j].life = 0;
        }
      }
    }
  }
}

class Tile {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 0;
  }
  
  //tells draw what to do
  show() {
    if (this.life === 0) {
      this.shade = 50;
    }else{
      this.shade = 200;
    }
    fill(this.shade);
    rect(this.x, this.y, res, res);
  }
  
  //determines what to do when clicked
  clicked() {
    if (this.life === 0) {
      this.life = 1;
    }else if (this.life === 1) {
      this.life = 0;
    }
  }
}
