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
let scaleGrid = 15; // pixels?
let width = 390;
let height = 390;
let widthScale;
let heightScale;
let score = 0;
let fr = 5;
let lastMilestone = 0;
let hs = 0;
let mode = "start";
let playB;
let resetB;
let instrB;
let instrbackB;

function setup() {
  createCanvas(width,height);
  playB = createButton('Play');
  playB.size(160, 35);
  playB.style("font-family", "Courier New");
  playB.style("font-size", "20px");
  playB.position(width/2-70,height/2+30);
  playB.mousePressed(startGame);

  instrB = createButton('Instructions');
  instrB.size(160, 35);
  instrB.style("font-family", "Courier New");
  instrB.style("font-size", "20px");
  instrB.position(width/2-70,height/2+70);
  instrB.mousePressed(instructionScreen);

  setVariables();

  resetB = createButton('Play Again');
  resetB.size(150, 35);
  resetB.style("font-family", "Courier New");
  resetB.style("font-size", "20px");
  resetB.position(width/2-68,height/2+60);
  resetB.mousePressed(resetGame);
  resetB.hide()

  instrbackB = createButton('Back');
  instrbackB.size(150, 35);
  instrbackB.style("font-family", "Courier New");
  instrbackB.style("font-size", "20px");
  instrbackB.position(width/2-68,height/2+120);
  instrbackB.mousePressed(startScreen);
  instrbackB.hide()
}
function startScreen() {
  mode="start"
  instrbackB.hide()
  instrB.show()
  playB.show()
}


function setVariables(){
  widthScale = width/scaleGrid;
  heightScale = height/scaleGrid;
  frameRate(fr);
  snake = new Snake();
  setFoodloc();
}

function setFoodloc() {
  let x = floor(random(widthScale));
  let y = floor(random(heightScale));
  food = createVector(x, y);

}

function startGame() {
  mode = "play";
  playB.remove();
  instrB.remove();
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
}

function draw() {
  background(231,233,150);
  if (mode == "play") {
    scale(scaleGrid);

    fill(151,162,117)
    textAlign(CENTER)
    textSize(8);
    text(score, floor(widthScale/2),floor(heightScale/2)+2);
    if (score > 0 && score % 5 === 0 && score !== lastMilestone) {
      fr += 2;
      frameRate(fr);
      lastMilestone = score;
    }
    if (snake.eat(food)==true) {
      setFoodloc();
      score +=1;
    }
    snake.update()
    snake.display();
    noStroke();
    fill(60 )
    rect(food.x, food.y, 1, 1);
    if (snake.gameOver()==true){
      mode = "gameover"
    }
  }
  else if (mode == "gameover"){
    background(231,233,150);
    fill(60)
    textSize(50);
    text('GAME OVER', (width/2),height/2-20);
    textSize(20);
    fill(89,94,80)
    if (score>hs) {hs=score}
    text('YOUR SCORE: '+score+'\nHIGH SCORE: '+hs, (width/2),height/2+20);
    resetB.show();
  }
  else if (mode=="start"){
    background(231,233,150);
    textFont('Courier New');
    textAlign(CENTER)
    fill(60)
    textSize(45);
    text('SNAKE GAME', width/2,height/2-20);
  }
  else if (mode=="instructions") {
    background(231,233,150);
    textAlign(CENTER)
    fill(60)
    textSize(30);
    text("How to Play", (width/2),height/2-110);
    textSize(16);
    textAlign(LEFT)
    text("Move the snake using arrow keys\nto eat the food in order to grow.\n\nDont let it touch the borders of\nthe screen or the snake will die.\n\nThe longer the snake, the faster\nit will move!", 30,height/2-50);
    instrbackB.show()
  }
}


function instructionScreen() {
 instrB.hide();
 playB.hide();
 mode = "instructions"
}

function resetGame() {
  mode = "play"
  resetB.hide();
  fr = 5;
  score = 0;

  setVariables();
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
