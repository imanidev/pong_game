//board
const board = document.querySelector('#board');
const context = board.getContext('2d');
board.width = 600;
board.height = 600;
board.style.backgroundColor = 'black';

//0 represents the top left corner of the board. The x axis goes from left to right and the y axis goes from top to bottom. 
//So the top left corner is 0, 0. The bottom right corner is 600, 600. The x axis goes from 0 to 600 and the y axis goes from 0 to 600

//ball object
const ball = {
    color: 'white',
    radius: 10,
    ballX: board.width / 2, // x position of ball
    ballY: board.height / 2, // y position of ball
    velocityX: 3,
    velocityY: 3
    // 3 = base speed
};                     

//left paddle object
const leftPaddle = {
    color: 'white',
    width: 10,
    height: 90,
    paddlePositionX: 10, // x position of left paddle. 10 because the left edge of the board is the starting point edge of the board
    paddlePositionY: board.height / 2 - 45, // center of paddle
};

//right paddle (computer paddle) 
const computerPaddle = {
    color: 'white',
    width: 10,
    height: 90,
    paddlePositionX: board.width - 20, // 20 because the width of the paddle is 10. so to be 10px away from the board, subtract an additional 10 
    paddlePositionY: board.height / 2 - 45, // center of paddle
    velocity: null //made null for now. will be set to a number later
};

//Since the width and height of the board is 600px. Divide it by 2 to get the center of the board
//board.height / 2 = the center of the board

//draw board
function drawBoard() {
    context.clearRect(0, 0, board.width, board.height); //clears board before drawing the next frame. The x and y are zeros to clear the board starting from the top left corner 
    drawBall();
    drawLeftPaddle(); //draw left paddle
    drawComputerPaddle(); //draw right paddle
}

//draw ball
function drawBall() {
    context.beginPath();
    context.fillStyle = ball.color; //set color of ball
    context.arc(ball.ballX, ball.ballY, ball.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}
//draw ball PI * 2 is the same as 360 degrees in a circle. The reason you multiply by 2 is because the arc method draws half a circle. So multiply by 2 for whole circle. Math.PI is the same as 180 degrees

//draw left paddle
function drawLeftPaddle() {
    context.beginPath(); //start drawing
    context.fillStyle = leftPaddle.color;
    context.fillRect(leftPaddle.paddlePositionX, leftPaddle.paddlePositionY, leftPaddle.width, leftPaddle.height); //draw paddle from all sides (x, y, width, height)
    context.closePath(); //end drawing
}

//draw computer paddle (right)
function drawComputerPaddle() {
    context.beginPath();
    context.fillStyle = computerPaddle.color;
    context.fillRect(computerPaddle.paddlePositionX, computerPaddle.paddlePositionY, computerPaddle.width, computerPaddle.height);
    context.closePath();
}

//move ball
function moveBall() {
    ball.ballX += ball.velocityX;
    ball.ballY += ball.velocityY;
    // the ball moves according to the velocity of the ball in the x and y direction
}

//move computer paddle
function moveComputerPaddle() {
    const velocityStrength = Math.floor(Math.random() * 3) + 0.5; // random numbers between 0.5 and 3   
    const compPaddleMovementVariation = Math.random() * 1.5 + 0.5; // random numbers between 0.5 and 1.5

    const maxPaddlePositionY = board.height - computerPaddle.height; // the maximum position of the paddle in the y direction. subtracts the height of the paddle (90) from the height of the board (600). so the paddle only goes to a maximum of 510px. this is so the computer paddle doesnt go off the board

    function moveUpOrDown() {
        if (ball.ballY < computerPaddle.paddlePositionY + computerPaddle.height / 2) { //ball is above the center of the paddle
            computerPaddle.velocity = -velocityStrength * compPaddleMovementVariation; // negative sign moves the paddle up. *rocket ship analogy* 
        } else if (ball.ballY > computerPaddle.paddlePositionY + computerPaddle.height / 2) { //ball is below the center of the paddle   
            computerPaddle.velocity = velocityStrength * compPaddleMovementVariation; // moves the paddle down. the positive sign is to move the paddle down
        } else {
            computerPaddle.velocity = 0;  //else, the paddle doesnt move
        }
    }
    //velocityStrength and compPaddleMovementVariation are multiplied together to get the computerPaddle.velocity

    //the computer paddle's movement is relative to the center of the paddle (computerPaddle.height / 2). If the ball is above the center of the paddle, the paddle will move up, and if the ball is below the center, the paddle will move down.

    computerPaddle.paddlePositionY += computerPaddle.velocity; // what makes the paddle move up and down

    function stayWithinFrame() {
        if (computerPaddle.paddlePositionY < 0) { //if the paddle goes off the top of the board, set the paddle position to 0 
            computerPaddle.paddlePositionY = 0; //set the paddle position to 0 (top of board)
        } else if (computerPaddle.paddlePositionY > maxPaddlePositionY) { //if the paddle goes off the bottom of the board
            computerPaddle.paddlePositionY = maxPaddlePositionY; //set the paddle position to (510)
        }
    }
    stayWithinFrame();
    moveUpOrDown();
}

//start the game
function startGame() {
    if (gameInterval) clearInterval(gameInterval); //if there's a game already running, clear it. to stop the game from running over and over.

    gameInterval = setInterval(function () {
        drawBoard();
        moveBall();
        moveComputerPaddle();
        increaseScore();
        checkCollisions();
    }, 1000 / 60); // 60 fps
}

//restart game
function resetGame() {
    clearInterval(gameInterval); //clears the game
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

    // reload page
    function reloadPage() {
        location.reload(); //this reloads the page based on the current url
    }
    setInterval(reloadPage, 2000);
}

//reset ball back to center of board
function resetBallToCenter() {
    ball.ballX = board.width / 2;
    ball.ballY = board.height / 2;
    ball.velocityX = - ball.velocityX; //makes the ball move in the opposite direction of the x axis
    ball.velocityY = 0; // prevents the ball moving in the y direction
}

//collision detection
function checkCollisions() {
    const topBoundary = ball.ballY - ball.radius <= 0; // this is the top of the board. the ball's y position is subtracted by the radius of the ball. if the ball's y position is less than or equal to 0, then the ball has hit the top boundary

    const bottomBoundary = ball.ballY + ball.radius >= board.height; // this is the bottom of the board

    if (topBoundary || bottomBoundary) { //if the ball hits the top or bottom boundary
        ball.velocityY = -ball.velocityY; //reverse the direction of the ball in the y axis
        if (topBoundary) {
            ball.ballY = ball.radius;
        } else {
            ball.ballY = board.height - ball.radius;
        }
    }

    const ballHitLeftPaddle =
        ball.ballX - ball.radius <= leftPaddle.paddlePositionX + leftPaddle.width &&
        ball.ballY >= leftPaddle.paddlePositionY &&
        ball.ballY <= leftPaddle.paddlePositionY + leftPaddle.height;

    // Check if the ball's left edge is to the left of the right edge of the left paddle
    // Check if the top of the ball is above the bottom of the left paddle
    // Check if the bottom of the ball is below the top of the left paddle

    const ballHitComputerPaddle =
        ball.ballX + ball.radius >= computerPaddle.paddlePositionX &&
        ball.ballY >= computerPaddle.paddlePositionY &&
        ball.ballY <= computerPaddle.paddlePositionY + computerPaddle.height;

    // Check if the ball's right edge is to the right of the left edge of the right paddle
    // Check if the top of the ball is above the bottom of the right paddle
    // Check if the bottom of the ball is below the top of the right paddle

    if (ballHitLeftPaddle || ballHitComputerPaddle) { //if the ball hits the left paddle or the right paddle 
        ball.velocityX = - (ball.velocityX + (Math.random() * 2 - 2));
        //reverse the direction of the ball in the x axis and add a random number between -2 and 2 to the velocityX
        ball.velocityY += (Math.random() * 2 - 2); //add a random number between -2 and 2 to the velocityY
        ball.velocityX *= 1.02; //increase ball X velocity by 2% per hit
        ball.velocityY *= 1.02; //increase ball Y velocity by 2% per hit
    }
}

//store scores of player and computer
let playerScore = 0;
let computerScore = 0;
let gameInterval = null; //make sure the game doesn't start automatically. using null because theres no value yet

//increase score
function increaseScore() {
    const leftPaddleScore = ball.ballX - ball.radius < 0; //this is the left side of the board
    const rightPaddleScore = ball.ballX + ball.radius > board.width; //this is the right side of the board

    if (leftPaddleScore) {
        computerScore++;
        document.querySelector('#computer-score').textContent = `Computer: ${computerScore}`;
        resetBallToCenter();
        if (computerScore >= 10) {
            whoWins('Computer');
        }
    } else if (rightPaddleScore) {
        playerScore++;
        document.querySelector('#player-score').textContent = `Player: ${playerScore}`;
        resetBallToCenter();
        if (playerScore >= 10) {
            whoWins('Player');
        }
    }
}

//show win or lose message
function whoWins(winner) {
    let winnerMessage; // holds the message to be displayed
    if (winner === 'Player') {
        winnerMessage = 'You win!';
    } else if (winner === 'Computer') {
        winnerMessage = 'Computer Wins!';
    }

    const messageEl = document.createElement('h1');
    messageEl.textContent = winnerMessage;
    document.querySelector('.winner-display').appendChild(messageEl);
    resetGame();
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

document.addEventListener('mousemove', event => {
    const maxPaddlePositionY = board.height - leftPaddle.height; // calculate the maximum position of the paddle within the board's boundaries
    leftPaddle.paddlePositionY = event.clientY - board.offsetTop - leftPaddle.height / 2; // board.offsetTop is the distance from the top of the board to the top of the page. event.clientY is the distance from the top of the page to the mouse pointer. leftPaddle.height/2 is to make sure the mouse pointer is in the middle of the paddle
    if (leftPaddle.paddlePositionY < 0) {
        leftPaddle.paddlePositionY = 0;
    } else if (leftPaddle.paddlePositionY > maxPaddlePositionY) {
        leftPaddle.paddlePositionY = maxPaddlePositionY;
    }
});

drawBoard();