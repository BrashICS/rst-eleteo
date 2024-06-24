/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author:
 */

'use strict';

// Declare global variables
let food;
let snake;
let scaleGrid = 15;
let width = 390;
let height = 390;
let widthScale;
let heightScale;
let score = 0;
let fr = 5;
let lastMilestone = 0;
let hs = 0;
let mode = "start";
let playB; // play button
let resetB; // play again button
let instrB; // instructions button
let instrbackB; // back button

function setup() { // create all buttons here
  createCanvas(width,height);
  setVariables();

  // create play button
  playB = createButton('Play');
  playB.size(160, 35);
  playB.style("font-family", "Courier New");
  playB.style("font-size", "20px");
  playB.position(width/2-70,height/2+30);
  playB.mousePressed(startGame);

  // create instructions button
  instrB = createButton('Instructions');
  instrB.size(160, 35);
  instrB.style("font-family", "Courier New");
  instrB.style("font-size", "20px");
  instrB.position(width/2-70,height/2+70);
  instrB.mousePressed(instructionScreen);

  // create and hide play again button
  resetB = createButton('Play Again');
  resetB.size(150, 35);
  resetB.style("font-family", "Courier New");
  resetB.style("font-size", "20px");
  resetB.position(width/2-68,height/2+60);
  resetB.mousePressed(resetGame);
  resetB.hide()

  // create and hide instructions back button
  instrbackB = createButton('Back');
  instrbackB.size(150, 35);
  instrbackB.style("font-family", "Courier New");
  instrbackB.style("font-size", "20px");
  instrbackB.position(width/2-68,height/2+120);
  instrbackB.mousePressed(startScreen);
  instrbackB.hide()
}

function setVariables() { // set up game
  widthScale = width/scaleGrid;
  heightScale = height/scaleGrid;
  frameRate(fr);
  snake = new Snake();
  setFoodloc();
}

function startScreen() { // to display start screen
  mode = "start"
  instrbackB.hide()
  instrB.show()
  playB.show()
}

function instructionScreen() { // function to activate instructions screen
  instrB.hide();
  playB.hide();
  mode = "instructions"
}

function setFoodloc() { // random location for food
  let x = floor(random(widthScale));
  let y = floor(random(heightScale));
  food = createVector(x, y);

}


function keyPressed() { // detect keys pressed
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
  return false;
}

 function startGame() { // activate game when play button is pressed
  mode = "play";
  playB.remove();
  instrB.remove();
}

 function resetGame() { // function to activate reset game
   mode = "play"
   resetB.hide();
   fr = 5;
   score = 0;
   setVariables();
}

function draw() {
  background(231,233,150);
  // four modes: play, start, gameover, instructions

  if (mode == "play") { // run game
    scale(scaleGrid);
    fill(151,162,117)

    // display score
    textAlign(CENTER)
    textSize(8);
    text(score, floor(widthScale/2),floor(heightScale/2)+2);

    // increase framerate every 5 points
    if (score > 0 && score % 5 === 0 && score !== lastMilestone) {
      fr += 2;
      frameRate(fr);
      lastMilestone = score;
    }

    // every time snake eats food
    if (snake.eat(food)==true) {
      setFoodloc();
      score +=1;
    }

    // snake and food display
    snake.update()
    snake.display();
    noStroke();
    fill(60)
    rect(food.x, food.y, 1, 1);

    // gameover
    if (snake.gameOver()==true){
      mode = "gameover"
    }
  }

  else if (mode == "gameover"){ // gameover screen
    background(231,233,150);

    //display game over
    fill(60)
    textSize(50);
    text('GAME OVER', (width/2),height/2-20);

    //display scores
    textSize(20);
    fill(89,94,80)
    if (score>hs) {hs=score}
    text('YOUR SCORE: '+score+'\nHIGH SCORE: '+hs, (width/2),height/2+20);

    // show play again button
    resetB.show();
  }

  else if (mode=="start") { // start screen
    background(231,233,150);

    // display game title
    textFont('Courier New');
    textAlign(CENTER)
    fill(60)
    textSize(45);
    text('SNAKE GAME', width/2,height/2-20);
  }

  else if (mode=="instructions") { // instructions screen
    background(231,233,150);

    // display text
    textAlign(CENTER)
    fill(60)
    textSize(30);
    text("How to Play", (width/2),height/2-110);
    textSize(16);
    textAlign(LEFT)
    text("Arrow keys to move the snake\n\nThe more food, the longer the\nsnake, the faster it goes!\n\nDon't let it touch the border or\nitself or game over!", 30,height/2-50);

    // show back button
    instrbackB.show()
  }
}

class Snake { // Snake
  constructor() {// set snake properties
    this.body = [];
    this.body[0] = createVector((widthScale/2),(heightScale/2));
    this.xdir = 0;
    this.ydir = 0;
    this.lengthv = 0;
  }

  setDir(x,y) { // set direction
    this.xdir = x;
    this.ydir = y;
  }

  update() { // move snake
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  gameOver() { // detect if snake overlaps or touches border
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

  eat(pos) { // detect if snake ate food
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.increase();
      return true;
    }
    return false;
  }

  increase() { // grow snake
    let head = this.body[this.body.length-1].copy();
    this.lengthv++;
    this.body.push(head);
  }

  display() { // show snake

    for(let i = 0; i < this.body.length; i++) {
      fill(60);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1,1)
    }
  }
}
function setVariables() { // set up game
  widthScale = width/scaleGrid;
  heightScale = height/scaleGrid;
  frameRate(fr);
  snake = new Snake();
  setFoodloc();
}
