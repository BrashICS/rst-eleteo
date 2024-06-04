/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author:
 */

'use strict';

let food;
let snake;
let scaleGrid = 30; // pixels?
let width = 420;
let height = 420;
let widthScale;
let heightScale;

function setup() {
  createCanvas(width,height);
  widthScale = width/scaleGrid;
  heightScale = height/scaleGrid;
  frameRate(5);
  snake = new Snake();
  setFoodloc();
}
function setFoodloc() {
  let x = floor(random(widthScale));
  let y = floor(random(heightScale));
  food = createVector(x, y);

}
function keyPressed() { // (0,0) is at top left
  if (keyCode === RIGHT_ARROW) {
    snake.setDir(1,0);
  }
  else if (keyCode === LEFT_ARROW) {
    snake.setDir(-1,0);
  }
  else if (keyCode === DOWN_ARROW) {
    snake.setDir(0,1);
  }
  else if (keyCode === UP_ARROW) {
    snake.setDir(0,-1);
  }
  else if (keyCode === 32){
    resetGame();
  }
}

function draw() {

  scale(scaleGrid);
  background(231,233,150);

  if (snake.eat(food)==true) {
    setFoodloc();
  }
  snake.update()
  snake.display();
  noStroke();
  fill(200,0,0);
  rect(food.x, food.y, 1, 1);
  if (snake.gameOver()==true){
    noLoop();
    gameOverScreen();
  }
}
function gameOverScreen() {
  resetMatrix();
  background(231,233,150);
  textFont('Courier New');
  fill(60)
  textSize(50);
  text('GAME OVER', 65, floor(height/2));
  fill(60)
  textSize(17);
  text('PRESS SPACE TO PLAY AGAIN', 76, 240);
}

function resetGame() {
  setup();
}

class Snake {
  constructor() {
    this.body = []; // create array for the body
    this.body[0] = createVector((widthScale/2),(heightScale/2)); // set in middle of screen
    this.xdir = 0;
    this.ydir = 0;
    this.lengthv = 0;
  }

  setDir(x,y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }
  gameOver() {
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > widthScale-1 || x < 0 || y > heightScale-1 || y < 0) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
      let part = this.body[i];
      if(part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }
  eat(pos) {
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.increase();
      return true;
    }
    return false;
  }
  increase() {
    let head = this.body[this.body.length-1].copy();
    this.lengthv++;
    this.body.push(head);
  }

  display() {
    for(let i = 0; i < this.body.length; i++) {
      fill(60);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1,1)
    }
  }
}
