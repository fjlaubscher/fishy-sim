import Rectangle from './Rectangle'

class FoodSource {
  constructor (x, y, width, height, energy) {
    this.position = new Rectangle(x, y, width, height)
    this.energy = energy
  }
  eaten () {
    if (this.energy >= 1) {
      this.energy--
      return 1
    } else {
      return 0
    }
  }
  draw (ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
    ctx.fillStyle = "#fff";
    ctx.fillText(this.energy, this.position.x + 10, this.position.y + 22);
  }
}

export default FoodSource
