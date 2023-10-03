import Game from "./Game.js";

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const mainScreen = document.getElementById("game-intro");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("game-end");
let game = null;

startButton.addEventListener("click", function () {
  startGame();
});

function startGame() {
  console.log("start game");
  gameScreen.classList.remove("hidden");
  mainScreen.classList.add("hidden");
  game = new Game();
  // game.start()
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      game.pressedKeys.up = true;
      break;
    case "ArrowDown":
      game.pressedKeys.down = true;
      break;
    case "ArrowLeft":
      game.pressedKeys.left = true;
      break;
    case "ArrowRight":
      game.pressedKeys.right = true;
      break;
  }
});
document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      game.pressedKeys.up = false;
      break;
    case "ArrowDown":
      game.pressedKeys.down = false;
      break;
    case "ArrowLeft":
      game.pressedKeys.left = false;
      break;
    case "ArrowRight":
      game.pressedKeys.right = false;
      break;
  }
});
