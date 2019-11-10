function Snake() {
  this.x = (Math.floor(Math.random() * rows) + 1 - 1) * grid;
  this.y = (Math.floor(Math.random() * cols) + 1 - 1) * grid;
  this.xVel = 0;
  this.yVel = 0;
  this.eaten = 0;
  this.tail = [];

  this.draw = function() {
    ctx.fillStyle = "#008000";
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, grid, grid);
    }
    ctx.fillStyle = "#00b300";
    ctx.fillRect(this.x, this.y, grid, grid);
  };

  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.eaten - 1] = { x: this.x, y: this.y };

    this.x += this.xVel;
    this.y += this.yVel;
  };

  this.move = function(direction) {
    switch (direction) {
      case "Up":
        this.xVel = 0;
        this.yVel = -grid;
        break;
      case "Down":
        this.xVel = 0;
        this.yVel = grid;
        break;
      case "Left":
        this.xVel = -grid;
        this.yVel = 0;
        break;
      case "Right":
        this.xVel = grid;
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
    let langCheck = document.getElementById("html").lang;
    if (langCheck === "fr") {
      confirm("\t\tPerdu!\n\n Votre longueur était: " + this.eaten);
    } else {
      confirm("\t\tGame Over!\n\n Your snake length was: " + this.eaten);
    }

    if (langCheck) {
      location.reload();
    } else {
      location.reload();
    }
  };
}
