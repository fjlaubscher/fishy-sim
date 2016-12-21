class Rectangle {
  constructor (x, y, width, height) {
    this.x = x || 0
    this.y = y || y
    this.width = width || 0
    this.height = height || 0

    this.left = this.x;
    this.top = this.y;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;
  }
  intersectsWith (rectB) {
    if (this.x < rectB.x + rectB.width && this.x + this.width > rectB.x &&
        this.y < rectB.y + rectB.height && this.y + this.height > rectB.y) {
      // collision detected!
      return true
    }

    return false
  }
}

export default Rectangle
