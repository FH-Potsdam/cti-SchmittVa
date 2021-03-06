/**
 * @todo How to constrain the particle to the screen?
 * @todo How to give an particle a live time?
 * @todo How to create a new particle after 50 frames?
 * @todo How to give the particle an on click action?
 */
let canvas = undefined;
let jim = undefined;
let displayHeight, displayWidth;
let xMin, xMax, yMin, yMax;
const agents = [];
function setup() {
  canvas = createCanvas(100, 100);
  canvas.parent("sketch");
  jim = new Agent(random(width), random(height));

  displayHeight = window.screen.height;
  displayWidth = window.screen.width;
  // Agent().display(); will throw an error
}

function draw() {
  jim.update();
  jim.display();
  for (const item of agents) {
    item.update();
    item.display();
  }
}

function mousePressed() {
  agents.push(new Agent(mouseX, mouseY));
}
function mouseDragged() {
  agents.push(new Agent(mouseX, mouseY));
}
function keyPressed() {
  if (key === "s" || key === "S") {
    if (canvas === undefined) {
      throw new Error("Could not find your canvas");
    }
    saveCanvas(canvas, "sketch", "png");
  }
}

function Agent(x, y) {
  if (!(this instanceof Agent)) {
    throw new TypeError(
      "Agent can not be called as a function. Create an instance by calling 'new Agent(x,y)'",
    );
  }

  /**
   * If you want the fancy noise driven movement you need to add
   * these variables
   */
  // this.xoff = x;
  // this.yoff = y;
  // this.noiseRange = 2;

  this.x = x;
  this.y = y;

  /**
   * If you want the fancy noise driven movement remove
   * this update function
   */
  this.update = function() {
    if(this.x == displayWidth)
    {
      if(this.y == displayHeight)
      {
        this.x = this.x + random(-1, 0);
        this.y = this.y + random(-1, 0);
      }
      else
      {
        this.x = this.x + random(-1, 0);
        this.y = this.y + random(-1, 1);
      }
    }
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
    // constrain him to the canvas
  };

  /**
   * If you want the fancy noise driven movement you need to add
   * this update function
   */
  // this.update = function() {
  //   this.xoff += 0.01;
  //   let xn = noise(this.xoff) * this.noiseRange;
  //   this.yoff += 0.01;
  //   let yn = noise(this.yoff) * this.noiseRange;
  //   this.x = this.x + xn - this.noiseRange / 2; //random(-1, 1);
  //   this.y = this.y + yn - this.noiseRange / 2; // random(-1, 1);
  //   // constrain him to the canvas
  //   if (this.x <= 0) {
  //     this.x = 0;
  //   }
  //   if (this.x >= width) {
  //     this.x = width;
  //   }
  //   if (this.y <= 0) {
  //     this.y = 0;
  //   }
  //   if (this.y >= height) {
  //     this.y = height;
  //   }
  // };

  this.display = function() {
    strokeWeight(2);
    stroke(0);
    fill(255);
    ellipse(this.x, this.y, 5);
  };
}
