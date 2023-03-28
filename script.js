//board
const board = document.querySelector('#board') //select canvas element
const context = board.getContext('2d') //get context of canvas element (2d)

//ball object
const ball = {
    color: 'white',
    radius: 10,
    ballX: board.width / 2,
    ballY: board.height / 2,
    velocityX: 3, // speed of ball in x direction
    velocityY: 3 // speed of ball in y direction
}
//Since the width and height of the canvas is 500px on both sides, we divide it by 2 to get the center of the canvas. 

//left paddle object
const leftPaddle = {
    color: 'white',
    width: 10, // width of paddle
    height: 70, // height of paddle
    paddlePositionX: 0, // x position of paddle
    paddlePositionY: board.height / 2 - 35, // 35 is half of the height of the paddle (70/2) 
    velocity: 3 // speed of paddle movement
}

//right paddle object
const rightPaddle = {
    color: 'white',
    width: 10, // width of paddle
    height: 70, // height of paddle
    paddlePositionX: board.width - 10, // x position of paddle
    paddlePositionY: board.height / 2 - 35, // 35 is half of the height of the paddle (70/2)
    velocity: 3 // speed of paddle movement
}
