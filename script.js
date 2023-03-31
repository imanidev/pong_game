//board
const board = document.querySelector('#board'); //select canvas element
const context = board.getContext('2d'); //get context of canvas element (2d)
board.width = 600; //set width of canvas
board.height = 600; //set height of canvas
board.style.backgroundColor = 'black'; //set background color of canvas

//ball object
const ball = {
    color: 'white',
    radius: 10,
    ballX: board.width / 2, // x position of ball. board.width / 2 is the center of the canvas
    ballY: board.height / 2, // y position of ball. board.height / 2 is the center of the canvas
    velocityX: 3, // speed of ball in x direction
    velocityY: 3 // speed of ball in y direction
};
//Since the width and height of the canvas is 600px on both sides, we divide it by 2 to get the center of the canvas. 

//left paddle object
const leftPaddle = {
    color: 'white',
    width: 10, // width of paddle
    height: 90, // height of paddle
    paddlePositionX: 10, // x position of left paddle. 10 because the left edge of the canvas is the starting point edge of the canvas.
    paddlePositionY: board.height / 2 - 45, // 45 is half of the height of the paddle (90/2) 
};

//right paddle (computer paddle) 
const computerPaddle = {
    color: 'white',
    width: 10,
    height: 90,
    paddlePositionX: board.width - 20, // its 20 because the width of the paddle is 10. to be at the right edge of the canvas, subtract an additional 10 from the width of the canvas.
    paddlePositionY: board.height / 2 - 45, // 45 is half of the height of the paddle (90/2)
    velocity: 3
};

//function to draw the board
function drawBoard() {
    context.clearRect(0, 0, board.width, board.height); // this makes sure that the canvas is cleared before drawing the next frame. The x and y are zero to clear whole canvas starting from the top left corner. 
    drawBall();
    drawLeftPaddle(); //draw left paddle
    drawComputerPaddle(); //draw right paddle
}

//draw the ball
function drawBall() {
    context.beginPath(); //start drawing
    context.fillStyle = ball.color; //set color of ball
    context.arc(ball.ballX, ball.ballY, ball.radius, 0, Math.PI * 2); //draw ball PI * 2 is the same as 360 degrees in a circle. The reason you multiply by 2 is because the arc method draws half a circle. So if you want to draw a full circle, you multiply by 2. Math.PI is the same as 180 degrees in a circle.
    context.fill(); //fill ball
    context.closePath(); //end drawing
}

//draw the left paddle
function drawLeftPaddle() {
    context.beginPath(); //start drawing
    context.fillStyle = leftPaddle.color; //set color of paddle
    context.fillRect(leftPaddle.paddlePositionX, leftPaddle.paddlePositionY, leftPaddle.width, leftPaddle.height); //draw paddle from all sides (x, y, width, height)
    context.closePath(); //end drawing
}

//draw the computer paddle (right)
function drawComputerPaddle() {
    context.beginPath();
    context.fillStyle = computerPaddle.color;
    context.fillRect(computerPaddle.paddlePositionX, computerPaddle.paddlePositionY, computerPaddle.width, computerPaddle.height);
    context.closePath();
}

//function to move the ball
function moveBall() {
    ball.ballX += ball.velocityX;
    ball.ballY += ball.velocityY;
    // the ball moves according to the velocity of the ball in the x and y direction
}

function moveComputerPaddle() {
    const randomNumber = Math.floor(Math.random() * 3) + 1; // random number between 1 and 3
    const moveComputerPaddleRandomly = Math.random() * 1 + 0.5; // random number between 0.5 and 1
    const maxPaddlePositionY = board.height - computerPaddle.height; // the maximum position of the paddle in the y direction

    if (ball.ballY < computerPaddle.paddlePositionY + computerPaddle.height / 2) { // if the ball is above the center of the paddle, the paddle will move up
        computerPaddle.velocity = -randomNumber * moveComputerPaddleRandomly; // the paddle will move up according to the random number generated
    } else if (ball.ballY > computerPaddle.paddlePositionY + computerPaddle.height / 2) {
        computerPaddle.velocity = randomNumber * moveComputerPaddleRandomly; //
    } else {
        computerPaddle.velocity = 0; // paddle is at center. so it wont move
    }

    computerPaddle.paddlePositionY += computerPaddle.velocity; //update the Y position of the paddle to the velocity of the paddle

    if (computerPaddle.paddlePositionY < 0) { // limit the movement of the paddle within the board's boundaries
        computerPaddle.paddlePositionY = 0;
    } else if (computerPaddle.paddlePositionY > maxPaddlePositionY) {
        computerPaddle.paddlePositionY = maxPaddlePositionY;
    }
}

//function to start the game
function startGame() {
    if (gameInterval) clearInterval(gameInterval); // prevent multiple intervals from running at the same time

    gameInterval = setInterval(function () {
        drawBoard();
        moveBall();
        moveComputerPaddle();
        increaseScore();
        checkCollisions();
    }, 1000 / 70); // 70 fps
}

function resetGame() {
    clearInterval(gameInterval); //to stop the game from running over and over again when the game is reset
    // ball.ballY = board.height / 2;
    // ball.velocityX = 2;
    // ball.velocityY = 2;
    // leftPaddle.paddlePositionY = board.height / 2 - 45;
    // computerPaddle.paddlePositionY = board.height / 2 - 45;
    // leftPaddle.paddlePositionX = 10;
    // computerPaddle.paddlePositionX = board.width - 20;
    // document.querySelector('#player-score').textContent = 'Player: 0';
    // document.querySelector('#computer-score').textContent = 'Computer: 0';
    // document.body.removeChild(messageEl)
    reload = setInterval(function () {
        location.reload();
    }, 1500); //1.5 seconds
    reload();
}

//reset ball position to random location on the board
function resetBall() {
    ball.ballX = Math.floor(Math.random() * (board.width - ball.radius * 2) + ball.radius); // this will give a random number between 10 and 590
    ball.ballY = Math.floor(Math.random() * (board.height - ball.radius * 2) + ball.radius); // this will give a random number between 10 and 590

    // reset ball velocity
    ball.velocityX = - ball.velocityX;
    ball.velocityY = Math.floor(Math.random() * 6 - 3); // random number between -3 and 3
}


function checkCollisions() {
    //ball and top/bottom boundaries
    if (ball.ballY - ball.radius <= 0) {
        ball.velocityY = -ball.velocityY;
        ball.ballY = ball.radius;
    } else if (ball.ballY + ball.radius >= board.height) {
        ball.velocityY = -ball.velocityY;
        ball.ballY = board.height - ball.radius;
    }

    //check if the ball hits the left paddle or the right paddle (computer paddle)
    const ballHitLeftPaddle = ball.ballX - ball.radius <= leftPaddle.paddlePositionX + leftPaddle.width &&
        ball.ballY >= leftPaddle.paddlePositionY &&
        ball.ballY <= leftPaddle.paddlePositionY + leftPaddle.height;

    const ballHitComputerPaddle = ball.ballX + ball.radius >= computerPaddle.paddlePositionX &&
        ball.ballY >= computerPaddle.paddlePositionY && // this makes sure the ball hits the paddle and not the board
        ball.ballY <= computerPaddle.paddlePositionY + computerPaddle.height;

    if (ballHitLeftPaddle || ballHitComputerPaddle) { //
        ball.velocityX = - (ball.velocityX + (Math.random() * 2 - 3)); // add a random value between -3 and 3 to the velocity of the ball
        ball.velocityY = ball.velocityY + (Math.random() * 2 - 3); // add a random value between -3 and 3 to the velocity of the ball 

        // increase ball velocity by 2%
        ball.velocityX *= 1.02;
        ball.velocityY *= 1.02;
    }
}

let playerScore = 0;
let computerScore = 0;
const maxScore = 5;
let gameInterval = null; //make sure the game doesn't start automatically. using null because theres no value yet


function winOrLose(winner) {

    let winOrLoseMessage; // put inside winOrLoseFunction
    if (winner === 'Player') {
        winOrLoseMessage = 'You win!';
    } else {
        winOrLoseMessage = 'You lose!';
    }
    const messageEl = document.createElement('h1');
    messageEl.textContent = winOrLoseMessage;
    document.body.appendChild(messageEl);
    resetGame();
    // winOrLoseMessage = ''; //empty string to hold the message to be displayed
}

function increaseScore() {
    if (ball.ballX - ball.radius < 0) {
        computerScore++;
        document.querySelector('#computer-score').textContent = `Computer: ${computerScore}`;
        resetBall();
        if (computerScore >= 5) {
            winOrLose('Computer');
        }
    } else if (ball.ballX + ball.radius > board.width) {
        playerScore++;
        document.querySelector('#player-score').textContent = `Player: ${playerScore}`;
        resetBall(); // 
        if (playerScore >= 5) {
            winOrLose('Player');
        }
    }
}

//event listeners

const startButton = document.querySelector('#startbtn');
startButton.addEventListener('click', function () {
    startGame();
});

const resetButton = document.querySelector('#resetbtn');
resetButton.addEventListener('click', function () {
    resetGame();
    drawBoard();
});

// moves the left paddle up and down and limits the movement of the paddle within the board's boundaries
document.addEventListener('mousemove', event => {
    const maxPaddlePositionY = board.height - leftPaddle.height; // calculate the maximum position of the paddle within the board's boundaries
    leftPaddle.paddlePositionY = event.clientY - board.offsetTop - leftPaddle.height / 2;
    if (leftPaddle.paddlePositionY < 0) { // limit the movement of the paddle within the board's boundaries.
        leftPaddle.paddlePositionY = 0;
    } else if (leftPaddle.paddlePositionY > maxPaddlePositionY) {
        leftPaddle.paddlePositionY = maxPaddlePositionY;
    }
});

//call functions
drawBall();
drawLeftPaddle();
drawComputerPaddle();