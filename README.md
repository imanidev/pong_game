# Pong Game

A simple implementation of the classic game Pong.

## Technologies Used

- HTML
- HTML5 Canvas
- CSS
- JavaScript

## Installation Instructions

- Clone or download the repository to your local machine

- Open the index.html file in your web browser

- Start playing!

- You can go to the live demo at [here](https://imanidev.github.io/pong_game/) to play the game


## How to Play

- Move your mouse to control the paddle

- The ball will bounce off the top and bottom walls. If it hits the left or right wall, the ball will reset back to the center of the board and the player will gain 1 point

- The game ends when a player reaches 10 points

## Approach Taken

- The game is built using the HTML5 canvas element to draw the game board, paddles and the ball
  
- The game logic is applied using JavaScript, with CSS used for styling
  
- The game uses an object-oriented approach where the game board, paddles and ball are all objects  with their own properties. This allows for more functionality to be added to the game in the future if needed
  
## Unsolved Issues

- The game is currently only playable on a desktop computer. The game will not work on a mobile device.

- The computer paddle at times will appear to be "stuck" to the top of the board

- The computer paddle get "shaky" when moving up and down the board
  