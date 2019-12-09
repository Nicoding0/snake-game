//!THIS.TAIL[] I - 1 IS THE VALUE FOR THE HEAD OF THE SNAKE

function Snake() {
  this.x = (Math.floor(Math.random() * rows) + 1 - 1) * grid;
  this.y = (Math.floor(Math.random() * cols) + 1 - 1) * grid;
  this.xVel = 0;
  this.yVel = 0;
  this.eaten = 0;
  this.alert = alert;

  //*empty array populated with coordinates after eating food
  this.tail = [];

  this.draw = function() {
    ctx.fillStyle = "#008000";
    //!order02

    //*loop over array and draw the item stored in the current iteration of i
    for (let i = 0; i < this.tail.length; i++) {
      //*get the x and y property and draw it
      ctx.fillRect(this.tail[i].x, this.tail[i].y, grid, grid);
    }
    ctx.fillStyle = "#00b300";
    ctx.fillRect(this.x, this.y, grid, grid);
  };

  this.update = function() {
    //!order01

    //*loop over the array
    for (let i = 0; i < this.tail.length - 1; i++) {
      //*go through snake tail and shift new tail item behind the head
      //*so the drawn tail is not on top of the head of the snake
      //*it would trigger colision detection and not grow
      this.tail[i] = this.tail[i + 1];
    }

    //*then add the new item to the end
    //*tail at index of eaten number - 1 will get an object of coordinates for the draw method
    this.tail[this.eaten - 1] = {
      x: this.x,
      y: this.y
    };

    this.x += this.xVel;
    this.y += this.yVel;
  };

  this.move = function(direction) {
    switch (direction) {
      case "Up":
        this.xVel = 0;
        this.yVel = -grid; //-10
        break;
      case "Down":
        this.xVel = 0;
        this.yVel = grid; //10
        break;
      case "Left":
        this.xVel = -grid; //-10
        this.yVel = 0;
        break;
      case "Right":
        this.xVel = grid; //10
        this.yVel = 0;
    }
  };

  this.eat = function(food) {
    if (this.x === food.x && this.y === food.y) {
      this.eaten++;
      return true;
    }
    return false;
  };

  this.collisionDetect = function() {
    //!order03

    //*this just checks if the head is touching any tail item if yes gameover
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        this.gameOver();
      }
    }

    if (this.x > canvas.width - grid) {
      this.xVel = 0;
      this.gameOver();
    }
    if (this.y > canvas.height - grid) {
      this.yVel = 0;

      this.gameOver();
    }
    if (this.x < 0) {
      this.xVel = 0;
      this.gameOver();
    }
    if (this.y < 0) {
      this.yVel = 0;
      this.gameOver();
    }
  };

  this.gameOver = function() {
    const langCheck = document.getElementById("html").lang;
    if (langCheck === "fr") {
      alert = confirm("\t\tPerdu!\n\n Votre longueur était: " + this.eaten);
    } else {
      alert = confirm(
        "\t\tGame Over!\n\n Your snake length was: " + this.eaten
      );
    }

    if (alert === true) {
      window.location.reload(false);
    } else {
      window.location.reload(false);
    }
  };
}
