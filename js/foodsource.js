function FoodSource(x, y, width, height, energy) {
	this.Position = new Rectangle(x, y, width, height);
	this.Energy = energy;
}

FoodSource.prototype.Eaten = function() {
	if(this.Energy >= 1){
		this.Energy--;
		return 1;
	} else {
		return 0;
	}
}

FoodSource.prototype.Draw = function(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.Position.X, this.Position.Y, this.Position.Width, this.Position.Height);
    ctx.fillStyle = "#fff";
   	ctx.fillText(this.Energy, this.Position.X + 10, this.Position.Y + 22);
}