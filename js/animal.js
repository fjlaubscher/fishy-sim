function Animal(x, y, width, height) {
    this.Position = new Rectangle(x, y, width, height);

    this.Energy = Random(100, 250);
    this._movementAngle = Random(0, 3600) / 10;
    this._speed = Random(50, 100) / 10;
    this.MovementAngle = 0.0;

    this.__defineGetter__("MovementAngle", function(){
        return this._movementAngle;
    });
}

Animal.prototype.SetMovementAngle = function(angle) {
    if(angle >= 0 && angle <=360){
        this._movementAngle = angle;
    }
}

Animal.prototype.GetRotationAngle = function() {
    return (Math.PI / 180) * (this._movementAngle - 90);
}

Animal.prototype.InBoundsOf = function(animal) {
    return this.Position.IntersectsWith(animal.Position);
}

Animal.prototype.MoveAnimal = function() {
    direction = new Rectangle(Math.cos(this.GetRotationAngle()), Math.sin(this.GetRotationAngle()));

    this.Position.X += direction.X * this._speed;
    this.Position.Y +=  direction.Y * this._speed;

    if(this.Position.Top < 0){
        this._movementAngle = Random(910, 2690) / 10;
    }

    if (this.Position.Bottom > _canvas.height) {
        this._movementAngle = Random(2710, 4590) / 10;

        if(this._movementAngle > 360){
            this._movementAngle = this._movementAngle - 360;
        }
    }

    if ((this.Position.Left < 0) || (this.Position.Right > _canvas.width)){
        this._movementAngle = 360 - this._movementAngle;
    }

    this.Energy--;
}

Animal.prototype.Draw = function(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.Position.X, this.Position.Y, this.Position.Width, this.Position.Height);
}