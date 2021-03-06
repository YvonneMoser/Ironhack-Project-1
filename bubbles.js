"use strict";

//Constructor for bubbles
class Bubbles {
  constructor (canvas, x, size, directionX){
    this.speed = 0.5;
    this.speedY = 2;
    this.directionY = -1;
    this.directionX = directionX;
    this.size = size;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = this.canvas.height+this.size;
  }

  //Draws bubble in canvas
  draw() {
    this.ctx.beginPath();  
    this.ctx.fillStyle = "rgba(45, 199, 230, 0.3)";
    this.ctx.strokeStyle = "rgba(182, 238, 246, 0.46)";
    this.ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  };

  //Moves bubble in canvas
  update() {
    this.x = this.x + this.directionX*this.speed;
    this.y = this.y + this.directionY*this.speedY;
  };
  
};

