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
    paddlePositionY: board.height / 2 - 45, // 45 is half of the height of the paddle (90/2) 
    velocity: 3 // speed of paddle movement
}

// right paddle (computer paddle)
const computerPaddle = { 
    color: 'white',
    width: 10,
    height: 90,
    paddlePositionX: board.width - 20,
    paddlePositionY: board.height / 2 - 45,
    velocity: 3
};


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


//function to draw the computer paddle (right)
function drawComputerPaddle() {
    context.beginPath();
    context.fillStyle = computerPaddle.color;
    context.fillRect(computerPaddle.paddlePositionX, computerPaddle.paddlePositionY, computerPaddle.width, computerPaddle.height);
    context.closePath();
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
    ball.ballX += ball.velocityX //move ball in x direction
    ball.ballY += ball.velocityY //move ball in y direction
}

//function to move the left paddle
function moveLeftPaddle() {
    leftPaddle.paddlePositionY += leftPaddle.velocity //move paddle in y direction. the += updates the position of the paddle based on the velocity . If you use =, the paddle will not move
}


function moveComputerPaddle() { // Move the right paddle (computer paddle) 
    computerPaddle.paddlePositionY += computerPaddle.velocity;
}


//function to start the game
function startGame() {
    let gameInterval = 0
    if (gameInterval) clearInterval(gameInterval); // clear any existing interval
    resetGame(); // reset scores and positions before starting the game
    gameInterval = setInterval(() => {
        drawBoard();
        moveBall();
        moveComputerPaddle(); // Move the computer's paddle
        increaseScore();
        checkCollisions();
        gameOver();
    }, 1000 / 60);
}

function increaseScore() {
    if (ball.ballX - ball.radius < 0) {
        computerScore++;
        document.querySelector('#computer-score').textContent = `Computer: ${computerScore}`;
    } else if (ball.ballX + ball.radius > board.width) {
        playerScore++;
        document.querySelector('#player-score').textContent = `Player: ${playerScore}`;
    }
}

//function to reset the game
function resetGame() {
    ball.ballX = board.width / 2
    ball.ballY = board.height / 2
    ball.velocityX = 3
    ball.velocityY = 3
    leftPaddle.paddlePositionY = board.height / 2 - 35
    computerPaddle.paddlePositionY = board.height / 2 - 35
}

function gameOver() {
    if (playerScore === 3) {
        document.querySelector('.win-or-lose').textContent = 'You win!';
    } else if (computerScore === 3) {
        document.querySelector('.win-or-lose').textContent = 'Computer wins!';
    }
}


function checkCollisions() {
    // Ball and top/bottom boundaries
    if (ball.ballY - ball.radius <= 0 || ball.ballY + ball.radius >= board.height) {
        ball.velocityY = -ball.velocityY;
    }

    // Ball and left/right boundaries
    if (ball.ballX - ball.radius <= 0 || ball.ballX + ball.radius >= board.width) {
        // Update scores
        if (ball.ballX - ball.radius <= 0) {
            computerScore++;
        } else if (ball.ballX + ball.radius >= board.width) {
            playerScore++;
        }

        // Reset ball to the center
        ball.ballX = board.width / 2;
        ball.ballY = board.height / 2;
        ball.velocityX = -ball.velocityX;
    }

    // Ball and paddles
    if (
        (ball.ballX - ball.radius <= leftPaddle.paddlePositionX + leftPaddle.width &&
            ball.ballY >= leftPaddle.paddlePositionY &&
            ball.ballY <= leftPaddle.paddlePositionY + leftPaddle.height) ||
        (ball.ballX + ball.radius >= computerPaddle.paddlePositionX &&
            ball.ballY >= computertPaddle.paddlePositionY &&
            ball.ballY <= computerPaddle.paddlePositionY + computerPaddle.height)
    ) {
        ball.velocityX = -ball.velocityX;
    }
}

function moveComputerPaddle() { // Move the computer's paddle
    if (ball.ballY < computerPaddle.paddlePositionY + computerPaddle.height / 2) {
        computerPaddle.velocity = -3;
    } else if (ball.ballY > computerPaddle.paddlePositionY + computerPaddle.height / 2) {
        computerPaddle.velocity = 3;
    } else {
        computerPaddle.velocity = 0;
    }
    computerPaddle.paddlePositionY += computerPaddle.velocity;
}


// variables to keep track of score and levels of the game
let startLevel = 1
let playerScore = 0
let computerScore = 0
const maxLevel = 5

//event listeners
const startButton = document.querySelector('#startbtn').addEventListener('click', () => {
    startGame()
})


document.addEventListener('mousemove', event => {
    leftPaddle.paddlePositionY = event.clientY - board.offsetTop - leftPaddle.height / 2;
});


//call functions. call functions makes sure the functions are executed
drawBoard()
drawBall()
drawLeftPaddle()
drawComputerPaddle()
moveLeftPaddle()
moveComputerPaddle()
moveBall()
gameOver()
increaseScore()
checkCollisions()

startGame()
resetGame()

