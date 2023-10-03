import Car from "./Car.js";
import Obstacle from "./Obstacle.js";

class Game {
  constructor() {
    // this.startScreen = document.getElementById("game-intro")
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.height = 600;
    this.width = 500;
    this.gameScreen.style.width = this.width + "px";
    this.gameScreen.style.height = this.height + "px";
    this.player = new Car(
      this.gameScreen,
      this.width / 2 - 100 / 2,
      this.height - 150,
      100,
      150,
      "./../images/car.png"
    );
    this.obstacles = [];
    this.animationId = null;
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.pressedKeys = {
      up: false,
      right: false,
      left: false,
      down: false,
    };
    this.start();
    this.counter = 0;
    // this.timeStamp = Date.now()
    this.canBeHit = true;
  }

  start() {
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    // console.table(this.player.direction)
    this.animationId = requestAnimationFrame(() => this.gameLoop());
    this.update();
  }

  update() {
    /**
     * Game engine
     * Add an obstacle every 5 seconds
     * assuming we have 60fps
     * move and update the position of every obstacles
     * move and update the player according to the pressed keys
     */
    if (this.counter % 300 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
      this.counter = 0;
    }
    this.counter++;

    for (const obstacle of this.obstacles) {
      obstacle.move();
      obstacle.updatePosition();

      if (this.player.didCollide(obstacle) && this.canBeHit) {
        // Do something
        // console.log("Collision !!!!!")
        this.lives--;
        this.canBeHit = false;
        setTimeout(() => {
          this.canBeHit = true;
        }, 3000);
      }
    }

    // console.log("HOW MANY OBSTACLES: ", this.obstacles.length)
    // Keeping all obstacles which are inside of the background-image.
    const obstaclesToRemove = this.obstacles.filter(
      (obstacle) => obstacle.top > this.height
    );

    obstaclesToRemove.forEach((obstacle) => obstacle.element.remove());

    this.obstacles = this.obstacles.filter(
      (obstacle) => obstacle.top <= this.height
    );

    if (this.lives === 0) {
      console.log("GAME OVER");
      cancelAnimationFrame(this.animationId);
      const animations = this.gameScreen.getAnimations();
      animations[0].pause();
    }

    for (const key in this.pressedKeys) {
      if (this.pressedKeys[key]) {
        this.player.move(key);
      }
    }
    this.player.updatePosition();
  }
}

export default Game;
