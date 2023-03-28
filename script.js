//board
const board = document.querySelector('#board') //select canvas element
const context = board.getContext('2d') //get context of canvas element (2d)
board.width = 600 //set width of canvas
board.height = 600 //set height of canvas
board.style.backgroundColor = 'black' //set background color of canvas

//ball object
const ball = {
    color: 'white',
    radius: 10,
    ballX: board.width / 2,
    ballY: board.height / 2,
    velocityX: 3, // speed of ball in x direction
    velocityY: 3 // speed of ball in y direction
}
//Since the width and height of the canvas is 600px on both sides, we divide it by 2 to get the center of the canvas. 

//left paddle object
const leftPaddle = {
    color: 'white',
    width: 10, // width of paddle
    height: 90, // height of paddle
    paddlePositionX: 10, // x position of left paddle. The reason why it is 0 is because the left edge of the canvas is the starting point (edge)of the canvas.
    paddlePositionY: board.height / 2 - 35, // 35 is half of the height of the paddle (70/2) 
    velocity: 3 // speed of paddle movement
}

//right paddle object
const rightPaddle = {
    color: 'white',
    width: 10, // width of paddle
    height: 90, // height of paddle
    paddlePositionX: board.width - 20, // x position of right paddle. to position it at the end of the canvas, we subtract the width of the paddle from the width of the canvas (600 - 10) this is to make sure the right paddle is not outside the canvas and is positioned at the end of the canvas the 10 can be seen as a buffer or padding
    paddlePositionY: board.height / 2 - 35, // 35 is half of the height of the paddle (70/2)
    velocity: 3 // speed of paddle movement
}

//function to draw the ball
function drawBall() {
    context.beginPath() //start drawing
    context.fillStyle = ball.color //set color of ball
    context.arc(ball.ballX, ball.ballY, ball.radius, 0, Math.PI * 2) //draw ball PI * 2 is the same as 360 degrees in a circle. The reason you multiply by 2 is because the arc method draws half a circle. So if you want to draw a full circle, you multiply by 2
    context.fill() //fill ball
    context.closePath() //end drawing
}

//function to draw the left paddle
function drawLeftPaddle() {
    context.beginPath() //start drawing
    context.fillStyle = leftPaddle.color //set color of paddle
    context.fillRect(leftPaddle.paddlePositionX, leftPaddle.paddlePositionY, leftPaddle.width, leftPaddle.height) //draw paddle
    context.closePath() //end drawing
}

//function to draw the right paddle
function drawRightPaddle() {
    context.beginPath() //start drawing
    context.fillStyle = rightPaddle.color //set color of paddle
    context.fillRect(rightPaddle.paddlePositionX, rightPaddle.paddlePositionY, rightPaddle.width, rightPaddle.height) //draw paddle
    context.closePath() //end drawing
}

//function to draw the board
function drawBoard() {
    context.clearRect(0, 0, board.width, board.height) //clear board
    drawBall() //draw ball
    drawLeftPaddle() //draw left paddle
    drawRightPaddle() //draw right paddle
}

//function to move the ball
function moveBall() {
    ball.ballX += ball.velocityX //move ball in x direction
    ball.ballY += ball.velocityY //move ball in y direction
}

//function to move the left paddle
function moveLeftPaddle() {
    leftPaddle.paddlePositionY += leftPaddle.velocity //move paddle in y direction. the += updates the position of the paddle based on the velocity . If you use =, the paddle will not move
}

//function to move the right paddle
function moveRightPaddle() {
    rightPaddle.paddlePositionY += rightPaddle.velocity //move paddle in y direction. the += updates the position of the paddle based on the velocity. If you use =, the paddle will not move
}
// variables to keep track of score and levels of the game
let startLevel = 1
let playerOneScore = 0
let playerTwoScore = 0
const maxLevel = 5

//function to start the game
function startGame() {
    if (startLevel === 1) {
        ball.velocityX = 3
        ball.velocityY = 3
    } else if (startLevel === 2) {
        ball.velocityX = 4
        ball.velocityY = 4
    } else if (startLevel === 3) {
        ball.velocityX = 5
        ball.velocityY = 5
    } else if (startLevel === 4) {
        ball.velocityX = 6
        ball.velocityY = 6
    } else if (startLevel === 5) {
        ball.velocityX = 7
        ball.velocityY = 7
    }
}

//function to reset the game
function resetGame() {
    ball.ballX = board.width / 2
    ball.ballY = board.height / 2
    ball.velocityX = 3
    ball.velocityY = 3
    leftPaddle.paddlePositionY = board.height / 2 - 35
    rightPaddle.paddlePositionY = board.height / 2 - 35
}

//function to increase the speed of the ball
function increaseSpeed() {
    if (ball.velocityX > 0 && ball.velocityY > 0) {
        ball.velocityX++
        ball.velocityY++
    } else if (ball.velocityX < 0 && ball.velocityY < 0) {
        ball.velocityX--
        ball.velocityY--
    }



    //event listeners
    const startButton = document.querySelector('#startbtn').addEventListener('click', () => {
        startGame()
    })
}

const resetButton = document.querySelector('#resetbtn').addEventListener('click', () => {
    resetGame()
})

//call functions. call functions makes sure the functions are executed
drawBoard()
drawBall()
drawLeftPaddle()
drawRightPaddle()
moveLeftPaddle()
moveRightPaddle()
moveBall()
