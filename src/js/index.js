import { 
  FISH_WIDTH,
  FISH_HEIGHT,
  FISH_COLOR,
  SHARK_WIDTH,
  SHARK_HEIGHT,
  SHARK_COLOR,
  FOODSOURCE_WIDTH,
  FOODSOURCE_HEIGHT,
  FOODSOURCE_COLOR,
  random
} from './helpers'
import Animal from './Animal'
import FoodSource from './FoodSource'

let fishArray = null
let foodSources = null
let shark = null

document.addEventListener('DOMContentLoaded', start)

function start () {
	const canvas = document.getElementById('canvas')
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext('2d')

	const maxFish = random(20, 100)
	const maxFood = random(5, 20)

	fishArray = []
	foodSources = []
	shark = new Animal(canvas, random(0, canvas.width - SHARK_WIDTH), random(0, canvas.height - SHARK_HEIGHT), SHARK_WIDTH, SHARK_HEIGHT)

	// draw fish
	for (var i = 0; i < maxFish; i++) {
		const fish = new Animal(canvas, random(0, canvas.width - FISH_WIDTH), random(0, canvas.height - FISH_HEIGHT), FISH_WIDTH, FISH_HEIGHT)
		fishArray.push(fish)
    fish.draw(context, FISH_COLOR)
	}

	for (var j = 0; j < maxFood; j++){
		const food = new FoodSource(random(0, canvas.width - FOODSOURCE_WIDTH), random(0, canvas.height - FOODSOURCE_HEIGHT), FOODSOURCE_WIDTH, FOODSOURCE_HEIGHT, random(200, 1000))
		foodSources.push(food)
    food.draw(context, FOODSOURCE_COLOR)
	}

	window.setInterval(tmrTick, 40)
}

// timer tick event
function tmrTick () {
  const canvas = document.getElementById('canvas')
	const context = canvas.getContext('2d')
	context.clearRect(0, 0, canvas.width, canvas.height)

  // move and draw shark
	shark.move();
	shark.draw(context, SHARK_COLOR)

  // draw foodsources
	for (var a = 0; a < foodSources.length; a++) {
		if (foodSources[a].energy > 0) {
			foodSources[a].draw(context, FOODSOURCE_COLOR);
		} else {
			// dead
			foodSources[a].draw(context, '#000000');
		}
	}

  // move and draw fish
	for (var i = 0; i < fishArray.length; i++) {
		if (fishArray[i].energy > 0) {

			if (shark.position.intersectsWith(fishArray[i].position) && shark.energy < 1000) {
				shark.energy += fishArray[i].energy
				fishArray[i].energy = 0
			} else {
				fishArray[i].move()
				fishArray[i].draw(context, FISH_COLOR)

				// basic schooling
				for (var j = 0; j < fishArray.length; j++) {
					if (fishArray[i].position.intersectsWith(fishArray[j].position)){
						fishArray[j].setAngle(fishArray[i].movementAngle)
					}
				}

				// feed
				for (var k = 0; k < foodSources.length; k++) {
					if (fishArray[i].position.intersectsWith(foodSources[k].position) && fishArray[i].energy < 100) {
						fishArray[i].energy += foodSources[k].eaten() * 50
					}
				}
			}
		}
	}
}
