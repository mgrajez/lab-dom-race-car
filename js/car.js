class Car {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.gameScreenBounding = this.gameScreen.getBoundingClientRect();
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.speed = 4;

    this.init(imgSrc);
  }

  init(src) {
    // this.element is now accessible from anywhere within the class
    this.element = document.createElement("img");
    // "./images/some-image.png"
    this.element.src = src;
    this.element.style.position = "absolute";
    this.element.style.height = this.height + "px";
    this.element.style.width = this.width + "px";
    this.gameScreen.append(this.element);
  }

  move(direction) {
    // TODO: This is ugly, let's rework it.

    switch (direction) {
      case "up":
        if (this.top <= 0) return;
        this.top -= this.speed;
        // this.top = this.top < 0 ? 0 : this.top
        break;
      case "down":
        const carBottom = this.top + this.height;
        if (carBottom >= this.gameScreenBounding.height) return;
        this.top += this.speed;
        // this.top =
        // 	carBottom > this.gameScreenBounding.height
        // 		? this.gameScreenBounding.height - this.height
        // 		: this.top
        break;
      case "left":
        if (this.left <= 0) return;
        this.left -= this.speed;
        // this.left = this.left < 20 ? 20 : this.left
        break;
      case "right":
        const carRight = this.left + this.width;
        if (carRight > this.gameScreenBounding.width) return;
        this.left += this.speed;
        // this.left =
        // 	carRight > this.gameScreenBounding.width
        // 		? this.gameScreenBounding.width - this.width
        // 		: this.left
        break;
    }
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }

  didCollide(obstacle) {
    const carBounding = this.element.getBoundingClientRect();
    const obsBounding = obstacle.element.getBoundingClientRect();

    const isInX =
      obsBounding.right > carBounding.left &&
      obsBounding.left < carBounding.right;
    const isInY =
      obsBounding.bottom > carBounding.top &&
      obsBounding.top < carBounding.bottom;

    // console.log(isInX, isInY)
    return isInX && isInY;
  }
}

export default Car;
