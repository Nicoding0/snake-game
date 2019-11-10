function Food() {
  this.x;
  this.y;

  this.foodPos = function() {
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * grid;
    this.y = (Math.floor(Math.random() * cols - 1) + 1) * grid;
  };
  this.draw = function() {
    ctx.fillStyle = "#ff471a";
    ctx.fillRect(this.x, this.y, grid, grid);
  };
}
