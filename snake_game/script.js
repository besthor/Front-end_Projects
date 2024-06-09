var canvas, ctx;
var playerName = "";
var applesEaten = 0;

window.onload = function () {
    playerName = prompt("Welcome! Please enter your name:");
    if (playerName === null || playerName === "") {
        playerName = "Player";
    }
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownFn);
    var x = 5; // Initial speed
    setInterval(draw, 1000 / x);
};

var gridSize = 21;
var nextX = 1;
var nextY = 0;
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = 10; // Initial snake position
var snakeY = 10; // Initial snake position
var appleX = 15;
var appleY = 15; // Corrected variable name

function draw() {
    snakeX += nextX;
    snakeY += nextY;

    // Wrap snake around the canvas edges
    if (snakeX < 0) {
        snakeX = gridSize - 1;
    }
    if (snakeX > gridSize - 1) {
        snakeX = 0;
    }
    if (snakeY < 0) {
        snakeY = gridSize - 1;
    }
    if (snakeY > gridSize - 1) {
        snakeY = 0;
    }

    // Check if snake eats the apple
    if (snakeX === appleX && snakeY === appleY) {
        tailSize++;
        applesEaten++;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "#ffffff";
    for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(snakeTrail[i].x * gridSize, snakeTrail[i].y * gridSize, gridSize, gridSize);
        if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
            gameOver();
        }
    }

    // Draw apple
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize, gridSize);

    // Update snake trail
    snakeTrail.push({ x: snakeX, y: snakeY });
    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }

    // Display number of apples eaten
    ctx.fillStyle = "";
    ctx.font = "16px Arial";
    ctx.fillText("Apples Eaten: " + applesEaten, 10, 20);
}

function keyDownFn(e) {
    switch (e.keyCode) {
        case 37: // Left arrow key
            if (nextX !== 1 || snakeTrail.length === 0) {
                nextX = -1;
                nextY = 0;
            }
            break;
        case 38: // Up arrow key
            if (nextY !== 1 || snakeTrail.length === 0) {
                nextX = 0;
                nextY = -1;
            }
            break;
        case 39: // Right arrow key
            if (nextX !== -1 || snakeTrail.length === 0) {
                nextX = 1;
                nextY = 0;
            }
            break;
        case 40: // Down arrow key
            if (nextY !== -1 || snakeTrail.length === 0) {
                nextX = 0;
                nextY = 1;
            }
            break;
    }
}

function gameOver() {
    var playAgain = confirm("Game Over, " + playerName + "! Apples Eaten: " + applesEaten + "\nDo you want to play again?");
    if (playAgain) {
        // Reset the game
        applesEaten = 0;
        tailSize = defaultTailSize;
        snakeX = 10;
        snakeY = 10;
        appleX = 15;
        appleY = 15;
        snakeTrail = [];
    } else {
        alert("Thank you for playing, " + playerName + "!");
        // Optionally, you can redirect or perform other actions here
    }
}
