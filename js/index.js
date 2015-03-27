var FISH_WIDTH = 25;
var FISH_HEIGHT = 25;
var SHARK_WIDTH = 45;
var SHARK_HEIGHT = 100;
var FOODSOURCE_WIDTH = 40;
var FOODSOURCE_HEIGHT = 40;

var _canvas;

var fishArray;
var foodSources;
var shark;

function Start(){

	_canvas = document.getElementById('canvas');

	var context = canvas.getContext('2d');

	var maxFish = Random(20, 100);
	var maxFood = Random(5, 20);

	fishArray = new Array();
	foodSources = new Array();
	shark = new Animal(Random(0, _canvas.width - SHARK_WIDTH), Random(0, _canvas.height - SHARK_HEIGHT), SHARK_WIDTH, SHARK_HEIGHT);

	// draw fish
	for (var i = 0; i < maxFish; i++) {
		fish = new Animal(Random(0, _canvas.width - FISH_WIDTH), Random(0, _canvas.height - FISH_HEIGHT), FISH_WIDTH, FISH_HEIGHT);
		fishArray.push(fish);
		fish.Draw(context, "#E09967");
	}

	for (var j = 0; j < maxFood; j++){
		food = new FoodSource(Random(0, _canvas.width - FOODSOURCE_WIDTH), Random(0, _canvas.height - FOODSOURCE_HEIGHT), FOODSOURCE_WIDTH, FOODSOURCE_HEIGHT, Random(200, 1000));
		foodSources.push(food);
		food.Draw(context, "#F08080")
	}

	// draw food

	window.setInterval(tmrTick, 35);
	window.addEventListener("keydown", MoveShark, false);
}

// timer tick event
function tmrTick(){
	var context = _canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);

	shark.MoveAnimal();
	shark.Draw(context, "#333333");

	for(var a = 0; a < foodSources.length; a++) {
		if(foodSources[a].Energy > 0){
			foodSources[a].Draw(context, "#F08080");
		} else {
			foodSources[a].Draw(context, "#000000");
		}
	}

	for (var i = 0; i < fishArray.length; i++) {
		if(fishArray[i].Energy > 0) {

			if(shark.Position.IntersectsWith(fishArray[i].Position) && shark.Energy < 1000) {
				shark.Energy += fishArray[i].Energy;
				fishArray[i].Energy = 0;
			} else {
				fishArray[i].MoveAnimal();
				fishArray[i].Draw(context, "#E09967");

				// basic schooling
				for(var j = 0; j < fishArray.length; j++){
					if(fishArray[i].Position.IntersectsWith(fishArray[j].Position)){
						fishArray[j].SetMovementAngle(fishArray[i].MovementAngle);
					}
				}

				// feed
				for (var k = 0; k < foodSources.length; k++) {
					if(fishArray[i].Position.IntersectsWith(foodSources[k].Position) && fishArray[i].Energy < 100) {
						fishArray[i].Energy += foodSources[k].Eaten() * 50;
					}
				}
			}
		}
	}
}

function MoveShark(e){
    switch(e.keyCode) {
        case 37:
            // left key pressed
            shark.SetMovementAngle(270);
            break;
        case 38:
            // up key pressed
            shark.SetMovementAngle(0);
            break;
        case 39:
            // right key pressed
            shark.SetMovementAngle(90);
            break;
        case 40:
            // down key pressed
            shark.SetMovementAngle(180);
            break;
	}

    shark.MoveAnimal();    
}

// get random int value between min & max values
function Random(min, max){
	retval = Math.floor(Math.random() * (max - min + 1)) + min;
	return retval;
}

function Rectangle(x, y, width, height) {

    if(!x){
        x = 0.0;
    }

    if(!y){
        y = 0.0;
    }

    if(!width){
        width = 0;
    }

    if(!height){
        height = 0;
    }

    this.Width = width;
    this.Height = height;
    this.X = x;
    this.Y = y;
    this.Left = this.X;
    this.Top = this.Y;
    this.Right = this.X + this.Width;
    this.Bottom = this.Y + this.Height;

    this.__defineGetter__("Left", function(){
        return this.X;
    });

    this.__defineGetter__("Top", function(){
        return this.Y;
    });

    this.__defineGetter__("Right", function(){
        return this.X + this.Width;
    });

    this.__defineGetter__("Bottom", function(){
        return this.Y + this.Height;
    });
}

Rectangle.prototype.IntersectsWith = function(rectB){
	retval = false;

	if (this.X < rectB.X + rectB.Width &&
	    this.X + this.Width > rectB.X &&
	    this.Y < rectB.Y + rectB.Height &&
	    this.Y + this.Height > rectB.Y) {
	    // collision detected!
		retval = true;
	}

  return retval;
}
