const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let score = document.querySelector(".lengthScore");
let diff = document.getElementById("diffSelector");
let highestLength = document.querySelector(".highestLength");
const diffConfirm = document.getElementById("okBtn");

let hiScore = localStorage.getItem("highScore") || 0;
highestLength.textContent = hiScore;

const grid = 10;
//*Rows and columns for the delimitation
const rows = canvas.height / grid - 1;
const cols = canvas.width / grid - 1;
//*holds a new Snake object
let snake;
let food;
let difficulty;

diffConfirm.addEventListener("click", () => {
  location.reload();
});
diff = diff.options[diff.selectedIndex].value;
difficulty = diff;

(function init() {
  //*create new Snake and Food and call foodPos method for rng
  snake = new Snake();
  food = new Food();

  //*initial food position
  food.foodPos();

  //*if food coords is on top of snake coords,
  //*then generate new food position otherwise it bugs out
  //*with the collision detection
  if (food.x === snake.x && food.y === snake.y) {
    food.foodPos();
  }

  console.log(food);

  //*draw and updates the snake position at an interval
  //*interval milliseconds changes with difficulty setting with var -> difficulty
  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    food.draw();
    snake.draw();

    snake.collisionDetect();

    if (snake.eat(food)) {
      food.foodPos();
    }
    //*display current length
    score.textContent = snake.eaten;

    //*Highest length persistent storage
    if (snake.eaten > hiScore) {
      localStorage.setItem("highScore", snake.eaten);
    }
  }, difficulty);
})();

//*This is the code that lets you move the snake
window.addEventListener("keydown", event => {
  const direction = event.key.replace("Arrow", "");
  snake.move(direction);
});
