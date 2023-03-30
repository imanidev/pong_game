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
    velocityX: 2, // speed of ball in x direction
    velocityY: 2 // speed of ball in y direction
}
//Since the width and height of the canvas is 600px on both sides, we divide it by 2 to get the center of the canvas. 

//left paddle object
const leftPaddle = {
    color: 'white',
    width: 10, // width of paddle
    height: 90, // height of paddle
    paddlePositionX: 10, // x position of left paddle. The reason why it is 10 is because the left edge of the canvas is the starting point (edge)of the canvas.
    paddlePositionY: board.height / 2 - 45, // 45 is half of the height of the paddle (90/2) 
    // velocity: 2 // speed of paddle movement
}

//right paddle (computer paddle) 
const computerPaddle = {
    color: 'white',
    width: 10,
    height: 90,
    paddlePositionX: board.width - 20, // x position of right paddle. The reason why it is 20 is because the right edge of the canvas is the ending point (edge) of the canvas.
    paddlePositionY: board.height / 2 - 45, // 45 is half of the height of the paddle (90/2)
    velocity: 2
}

//function to draw the board
function drawBoard() {
    context.clearRect(0, 0, board.width, board.height) //clear board
    drawBall() //draw ball
    drawLeftPaddle() //draw left paddle
    drawComputerPaddle() //draw right paddle
}

//draw the ball
function drawBall() {
    context.beginPath() //start drawing
    context.fillStyle = ball.color //set color of ball
    context.arc(ball.ballX, ball.ballY, ball.radius, 0, Math.PI * 2) //draw ball PI * 2 is the same as 360 degrees in a circle. The reason you multiply by 2 is because the arc method draws half a circle. So if you want to draw a full circle, you multiply by 2
    context.fill() //fill ball
    context.closePath() //end drawing
}

//draw the left paddle
function drawLeftPaddle() {
    context.beginPath() //start drawing
    context.fillStyle = leftPaddle.color //set color of paddle
    context.fillRect(leftPaddle.paddlePositionX, leftPaddle.paddlePositionY, leftPaddle.width, leftPaddle.height) //draw paddle
    context.closePath() //end drawing
}

//draw the computer paddle (right)
function drawComputerPaddle() {
    context.beginPath()
    context.fillStyle = computerPaddle.color
    context.fillRect(computerPaddle.paddlePositionX, computerPaddle.paddlePositionY, computerPaddle.width, computerPaddle.height);
    context.closePath()
}

//function to move the ball
function moveBall() {
    ball.ballX += ball.velocityX //move ball in x direction. updates the position of the ball's velocity
    ball.ballY += ball.velocityY //move ball in y direction. updates the position of the ball's velocity
}

//function to start the game
function startGame() {
    if (gameInterval) clearInterval(gameInterval) // clear any existing interval

    gameInterval = setInterval(function () { // the ball is able to move because of the setInterval method. It is set to 70 fps 
        drawBoard()
        moveBall()
        moveComputerPaddle()
        increaseScore()
        checkCollisions()
    }, 1000 / 70) // 70 fps
}

function resetGame() {
    clearInterval(gameInterval) //to stop the game from running over and over again when the game is reset
    ball.ballX = Math.floor(Math.random() * (board.width - ball.radius * 2)) + ball.radius;
    ball.ballY = board.height / 2
    ball.velocityX = 2
    ball.velocityY = 2
    leftPaddle.paddlePositionY = board.height / 2 - 45
    computerPaddle.paddlePositionY = board.height / 2 - 45
    playerScore = 0
    computerScore = 0
    startGame()
}

//resets the ball to the center of the board
function resetBall() {
    // reset ball position to random location on the board
    ball.ballX = Math.floor(Math.random() * (board.width - ball.radius * 2) + ball.radius)
    ball.ballY = Math.floor(Math.random() * (board.height - ball.radius * 2) + ball.radius)

    // reset ball velocity
    ball.velocityX = -ball.velocityX
    ball.velocityY = Math.floor(Math.random() * 6 - 3) // random number between -3 and 3

    // update ball speed
    increaseBallSpeed += 0.05
    ball.velocityX *= increaseBallSpeed
    ball.velocityY *= increaseBallSpeed
}

function checkCollisions() {
    //ball and top/bottom boundaries
    if (ball.ballY - ball.radius <= 0) {
        ball.velocityY = -ball.velocityY
        ball.ballY = ball.radius + 1// move the ball away from the boundary by a small amount
    } else if (ball.ballY + ball.radius >= board.height) {
        ball.velocityY = -ball.velocityY
        ball.ballY = board.height - ball.radius - 1 // move the ball away from the boundary by a small amount
    }

    // statement to check if the ball hits the left paddle or the right paddle (computer paddle)
    const ballHitLeftPaddle = ball.ballX - ball.radius <= leftPaddle.paddlePositionX + leftPaddle.width &&
        ball.ballY >= leftPaddle.paddlePositionY &&
        ball.ballY <= leftPaddle.paddlePositionY + leftPaddle.height

    const ballHitComputerPaddle = ball.ballX + ball.radius >= computerPaddle.paddlePositionX &&
        ball.ballY >= computerPaddle.paddlePositionY &&
        ball.ballY <= computerPaddle.paddlePositionY + computerPaddle.height

    if (ballHitLeftPaddle || ballHitComputerPaddle) {
        ball.velocityX = -(ball.velocityX + (Math.random() * 2 - 1))// reverse the direction of the ball and add a random value to its velocity
        ball.velocityY = ball.velocityY + (Math.random() * 2 - 1) // add a random value to the ball's vertical velocity
    }
}

//this function checks to see if the ball hits the paddle. If it does, the ball's velocity is reversed and a random number is added to the ball's velocity. This makes the game more interesting. this brings more realism to the game. it's as if you were playing against a real person.

function moveComputerPaddle() {
    const randomNumber = Math.floor(Math.random() * 4) + 1
    const randomness = Math.random() * 0.5 + 0.5
    const maxPaddlePositionY = board.height - computerPaddle.height

    if (ball.ballY < computerPaddle.paddlePositionY + computerPaddle.height / 2) {
        computerPaddle.velocity = -randomNumber * randomness
    } else if (ball.ballY > computerPaddle.paddlePositionY + computerPaddle.height / 2) {
        computerPaddle.velocity = randomNumber * randomness
    } else {
        computerPaddle.velocity = 0
    }

    computerPaddle.paddlePositionY += computerPaddle.velocity

    if (computerPaddle.paddlePositionY < 0) { // limit the movement of the paddle within the board's boundaries
        computerPaddle.paddlePositionY = 0
    } else if (computerPaddle.paddlePositionY > maxPaddlePositionY) {
        computerPaddle.paddlePositionY = maxPaddlePositionY
    }
}

//getting this paddle to move randomly was challenging. I had to use the Math.random() method to generate a random number between 0 and 1. I then multiplied that number by 4 and added 1 to get a random number between 1 and 4. I then multiplied that number by a random number between 0.5 and 1 to get a random number between 0.5 and 4. I then used that number to move the paddle up and down. I also used the Math.floor() method to round the number down to the nearest whole number. I also used the Math.random() method to generate a random number between 0 and 1. I then multiplied that number by 0.5 and added 0.5 to get a random number between 0.5 and 1. I then used that number to add some randomness to the speed of the paddle. I also used the Math.random() method to generate a random number between 0 and 1. I then multiplied that number by 2 and subtracted 1 to get a random number between -1 and 1. I then used that number to add some randomness to the speed of the ball. I also used the Math.random() method to generate a random number between 0 and 1. I then multiplied that number by 2 and subtracted 1 to get a random number between -1 and 1. I then used that number to add some randomness to the speed of the ball.


// variables to keep track of score and levels of the game
let startLevel = 1
let playerScore = 0
let computerScore = 0
const maxLevel = 5
let gameInterval = null // it's null to make sure the game doesn't start automatically
let increaseBallSpeed = 1.05 // increase the speed of the ball by 5% every time it hits the paddle



function increaseScore() {
    if (ball.ballX - ball.radius < 0) {
        computerScore++
        document.querySelector('#computer-score').textContent = `Computer: ${computerScore}`
        resetBall()
        if (computerScore >= 5) {
            endGame('Computer')
        }
    } else if (ball.ballX + ball.radius > board.width) {
        playerScore++
        document.querySelector('#player-score').textContent = `Player: ${playerScore}`
        resetBall()
        if (playerScore >= 5) {
            endGame('Player')
        }
    }
}

function endGame(winner) {
    const message = winner === 'Player' ? 'You win!' : 'You lose!'
    const messageEl = document.createElement('h2')
    messageEl.textContent = message
    document.body.appendChild(messageEl)
}

//event listeners
const startButton = document.querySelector('#startbtn').addEventListener('click', () => {
    startGame()
})

const resetButton = document.querySelector('#resetbtn').addEventListener('click', () => {
    resetGame()
    drawBoard()
})

document.addEventListener('mousemove', event => {
    const maxPaddlePositionY = board.height - leftPaddle.height // calculate the maximum position of the paddle within the board's boundaries
    leftPaddle.paddlePositionY = event.clientY - board.offsetTop - leftPaddle.height / 2
    if (leftPaddle.paddlePositionY < 0) { // limit the movement of the paddle within the board's boundaries
        leftPaddle.paddlePositionY = 0
    } else if (leftPaddle.paddlePositionY > maxPaddlePositionY) {
        leftPaddle.paddlePositionY = maxPaddlePositionY
    }
})

//call functions
drawBall()
drawLeftPaddle()
drawComputerPaddle()
// moveLeftPaddle() // no longer needed sinece the left paddle is controlled by the mouse (aka the user)
// window.requestAnimationFrame(computerPaddle)