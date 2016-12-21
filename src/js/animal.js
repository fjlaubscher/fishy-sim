import Rectangle from './Rectangle'
import { random } from './helpers'

class Animal {
  constructor (canvas, x, y, width, height) {
    this.canvas = canvas
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.position = new Rectangle(x, y, width, height)
    this.energy = random(100, 250)
    this.movementAngle = random(0, 3600) / 10
    this.speed = random(50, 100) / 10
    this.angle = 0.0
  }
  setAngle (angle) {
    if (angle >= 0 && angle <=360){
      this.movementAngle = angle
    }
  }
  rotationAngle () {
    return (Math.PI / 180) * (this.movementAngle - 90)
  }
  move () {
    const direction = new Rectangle(Math.cos(this.rotationAngle()), Math.sin(this.rotationAngle()))
    this.position.x += direction.x * this.speed;
    this.position.y +=  direction.y * this.speed;

    // check top
    if (this.position.top < 0){
        this.movementAngle = random(910, 2690) / 10
    }

    // check bottom
    if (this.position.bottom > this.canvas.height) {
        this.movementAngle = random(2710, 4590) / 10

        if(this.movementAngle > 360){
            this.movementAngle = this.movementAngle - 360
        }
    }

    // check sides
    if ((this.position.left < 0) || (this.position.right > this.canvas.width)){
        this.movementAngle = 360 - this.movementAngle
    }

    this.energy--
  }
  draw (ctx, color) {
    ctx.fillStyle = color
    ctx.fillRect(this.position.X, this.position.Y, this.position.Width, this.position.Height)
  }
}

export default Animal
