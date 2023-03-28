const board = document.querySelector('#board')
const context = board.getContext('2d')

//create ball object

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white'
}