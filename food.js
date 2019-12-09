function Food() {
  this.x;
  this.y;

  //*generate a random place for the food to be drawn on
  //*Math.floor gives a rounded number so if you give it
  //*5.95 it will give back 5 or if giving 5.05 it will also give 5
  //*it never rounds up like you'd expect it if its more than .50
  //*if the number you give it is negative it will round up (-5.05 gives 6) because reasons???
  //*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
  this.foodPos = function() {
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * grid;
    this.y = (Math.floor(Math.random() * cols - 1) + 1) * grid;
  };
  this.draw = function() {
    ctx.fillStyle = "#ff471a";
    ctx.fillRect(this.x, this.y, grid, grid);
  };
}
