/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author:
 */

'use strict';

let snake;
let food;
let scaleGrid = 20; // pixels?
let width = 400;
let height = 400;
let widthScale;
let heightScale;

function setup() {
  createCanvas(width,height);
  widthScale = width/scaleGrid;
  heightScale = height/scaleGrid;
  let snake = new Snake();
}

function draw() {
  scale(scaleGrid);
  background(231,233,150);
  snake.show();
}

function keysPressed() { // (0,0) is at top left
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
}

class Snake {
  constructor() {
    this.body = []; // create array for the body
    this.body[0] = createVector((widthScale/2),(heightScale/2)); // set in middle of screen
    this.xdir = 0;
    this.ydir = 0;
  }

  setDir(x,y) {
    this.xdir = x;
    this.ydir = y;
  }

  show() {
    for(let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1)
    }
  }
}
