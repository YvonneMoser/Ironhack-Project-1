"use strict";




//creates a Game constructor
function Game (canvas){
  this.player = null;
  this.sharks = [];
  this.fishes = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.gameOver = false;
  this.gameWon = false;
}



//Start the loop (by calling the update, draw and clear function)
Game.prototype.startLoop = function (){

  this.player = new Player(this.canvas);


  let loop = () => {
//To create a random number of sharks in the sharks array
    if (Math.random() > 0.97){ 
      let randomNumber = (Math.random()*this.canvas.height-30)+30;
      this.sharks.push(new Shark(this.canvas, randomNumber));
    }

//new condition, because there should be less fishes than sharks in the game 
    if (Math.random() > 0.995){ 
      let randomNumber2 = (Math.random()*this.canvas.height-30)+30;
      this.fishes.push(new Fish(this.canvas, randomNumber2, "img/background.png"));
    }

    if (Math.random() > 0.995){ 
      let randomNumber2 = (Math.random()*this.canvas.height-30)+30;
      this.fishes.push(new Fish(this.canvas, randomNumber2, "img/22294-tropical-fish-icon.png"));
    }

    if (Math.random() > 0.995){ 
      let randomNumber2 = (Math.random()*this.canvas.height-30)+30;
      this.fishes.push(new Fish(this.canvas, randomNumber2, "img/starfish.png"));
    }

    if (Math.random() > 0.995){ 
      let randomNumber2 = (Math.random()*this.canvas.height-30)+30;
      this.fishes.push(new Fish(this.canvas, randomNumber2, "img/turtle.png"));
    }
   
   
    this.clearCanvas();
    this.updateCanvas();
    this.drawCanvas();
    let endScore= document.querySelector(".score");
    endScore.innerHTML = `Score: ${this.player.score}`  
    this.checkCollisions();
    if (this.gameOver === false && this.gameWon === false){
      window.requestAnimationFrame(loop);
    }


  }


window.requestAnimationFrame(loop);

};

// clear the canvas
Game.prototype.clearCanvas = function(){
  this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
};



// draws the canvas (integrates player, sharks and fishes)
Game.prototype.drawCanvas = function(){
  
  this.player.draw1();
  this.player.draw3();
  this.sharks.forEach(function(shark){
  shark.draw();
});
  this.fishes.forEach(function(fish){
  fish.draw1();

  });
};

//updates the canvas (new position for sharks, players and fishes)
Game.prototype.updateCanvas = function (){
  this.player.update();
  this.sharks.forEach(function(shark){
    shark.update();
  });
  this.fishes.forEach(function(fish){
  fish.update();
  });
};

//checks if there`s a collision with a shark or a fish. When colliding a shark the player looses one live. by colliding with fish the score increases
Game.prototype.checkCollisions = function(){
  
  this.sharks.forEach((shark, index) => {
    let collidingShark = this.player.checkCollisionShark(shark);
    if (collidingShark){
      this.sharks.splice(index,1);
      this.player.setLives();
      if (this.player.lives === 0){
        this.gameOver = true;
        this.onGameOver();
      }
    }
  });

  this.fishes.forEach((fish,index)=> {
  let collidingFish = this.player.checkFish(fish);
  if(collidingFish){
    this.fishes.splice(index, 1);
    this.player.setScore();
    if (this.player.score > 5000){
      this.gameWon = true;
      this.clearCanvas();//wie kann ich hier canvas cleanen
      this.onGameWon();
    }
  }
  }); 
};


//wie checken ob es im bildschirm ist
Game.prototype.checkInCanvas = function(){
  if (this.player.x >= gameContainer.canvasGame.width - this.player.width) {
    this.player.x = gameContainer.canvasGame.width - this.player.width;
}
 };



Game.prototype.setGameOverCallback = function (callback){
  this.onGameOver = callback;
}


Game.prototype.setGameWonCallback = function (callback){
  this.onGameWon = callback;
}
