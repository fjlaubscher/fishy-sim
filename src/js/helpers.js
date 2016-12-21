// get random int value between min & max values
export function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const FISH_WIDTH = 25
export const FISH_HEIGHT = 25
export const FISH_COLOR = '#E09967'

export const SHARK_WIDTH = 45
export const SHARK_HEIGHT = 100
export const SHARK_COLOR = '#333333'

export const FOODSOURCE_WIDTH = 40
export const FOODSOURCE_HEIGHT = 40
export const FOODSOURCE_COLOR = '#F08080'
