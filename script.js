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
    velocity: 2 // speed of paddle movement
}

// right paddle (computer paddle)
const computerPaddle = {
    color: 'white',
    width: 10,
    height: 90,
    paddlePositionX: board.width - 20, // x position of right paddle. The reason why it is 20 is because the right edge of the canvas is the ending point (edge) of the canvas.
    paddlePositionY: board.height / 2 - 45, // 45 is half of the height of the paddle (90/2)
    velocity: 50
}

// draw the ball
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

//function to draw the board
function drawBoard() {
    context.clearRect(0, 0, board.width, board.height) //clear board
    drawBall() //draw ball
    drawLeftPaddle() //draw left paddle
    drawComputerPaddle() //draw right paddle
}

//function to move the ball
function moveBall() {
    ball.ballX += ball.velocityX //move ball in x direction. updates the position of the ball's velocity
    ball.ballY += ball.velocityY //move ball in y direction. updates the position of the ball's velocity
}

//function to move the computer paddle
function moveComputerPaddle() { // Move the right paddle (computer paddle) 
    computerPaddle.paddlePositionY += computerPaddle.velocity
}


// function to start the game
function startGame() {
    if (gameInterval) clearInterval(gameInterval) // clear any existing interval
    resetGame() // reset scores and positions before starting the game
    gameInterval = setInterval(() => {
        drawBoard()
        moveBall()
        moveComputerPaddle() // Move the computer's paddle
        increaseScore()
        checkCollisions()
        checkWin() // Check if player has won
        checkLose() // Check if player has lost
    }, 1000 / 70) // 70 fps
}


//function to reset the game
function resetGame() {
    clearInterval(gameInterval) //to stop the game from running over and over again when the game is reset
    ball.ballX = board.width / 2
    ball.ballY = board.height / 2
    ball.velocityX = 2
    ball.velocityY = 2
    leftPaddle.paddlePositionY = board.height / 2 - 45
    computerPaddle.paddlePositionY = board.height / 2 - 45
    playerScore = 0
    computerScore = 0
}


//function to increase score
function increaseScore() {
    if (ball.ballX - ball.radius < 0) {
        computerScore++
        document.querySelector('#computer-score').textContent = `Computer: ${computerScore}`

    } else if (ball.ballX + ball.radius > board.width) {
        playerScore++
        document.querySelector('#player-score').textContent = `Player: ${playerScore}`
    }
}

// Ball and top/bottom boundaries
function checkCollisions() {
    if (ball.ballY - ball.radius <= 0 || ball.ballY + ball.radius >= board.height) {
        ball.velocityY = -ball.velocityY
    }

    // Ball and left/right boundaries
    if (ball.ballX - ball.radius <= 0 || ball.ballX + ball.radius >= board.width) {
        // Update scores
        if (ball.ballX - ball.radius <= 0) {
            computerScore++
        } else if (ball.ballX + ball.radius >= board.width) {
            playerScore++
        }
        // Reset ball to the center
        ball.ballX = board.width / 2
        ball.ballY = board.height / 2
        ball.velocityX = -ball.velocityX
    }

    // statement to check if the ball hits the left paddle or the right paddle (computer paddle)
    if ((ball.ballX - ball.radius <= leftPaddle.paddlePositionX + leftPaddle.width &&
        ball.ballY >= leftPaddle.paddlePositionY &&
        ball.ballY <= leftPaddle.paddlePositionY + leftPaddle.height) ||
        (ball.ballX + ball.radius >= computerPaddle.paddlePositionX &&
            ball.ballY >= computerPaddle.paddlePositionY &&
            ball.ballY <= computerPaddle.paddlePositionY + computerPaddle.height)) {
        ball.velocityX = -ball.velocityX
    }
}

// moves the computer paddle based on the position of the ball on the y axis
function moveComputerPaddle() {
    if (ball.ballY < computerPaddle.paddlePositionY + computerPaddle.height / 2) {
        computerPaddle.velocity = -3
    } else if (ball.ballY > computerPaddle.paddlePositionY + computerPaddle.height / 2) {
        computerPaddle.velocity = 3
    } else {
        computerPaddle.velocity = 0
    }
    computerPaddle.paddlePositionY += computerPaddle.velocity;
}


// variables to keep track of score and levels of the game
let startLevel = 1
let playerScore = 0
let computerScore = 0
const maxLevel = 5
let gameInterval = null // it's null to make sure the game doesn't start automatically
let increaseBallSpeed = 1.05 // increase the speed of the ball by 5% every time it hits the paddle

function ifWin() {
    if (playerScore === maxLevel) {
        document.querySelector('.win-or-lose').textContent = 'You win!'
        clearInterval(gameInterval)
    }
}

function ifLose() {
    if (computerScore === maxLevel) {
        document.querySelector('.win-or-lose').textContent = 'Computer wins!'
        clearInterval(gameInterval)
    }
}

//event listeners
const startButton = document.querySelector('#startbtn').addEventListener('click', () => {
    startGame()
})

const resetButton = document.querySelector('#resetbtn').addEventListener('click', () => {
    resetGame()
})
//mouse movement
document.addEventListener('mousemove', event => {
    leftPaddle.paddlePositionY = event.clientY - board.offsetTop - leftPaddle.height / 2
})


//call functions
drawBall()
drawLeftPaddle()
drawComputerPaddle()
// moveLeftPaddle() // no longer needed sinece the left paddle is controlled by the mouse (aka the user)
