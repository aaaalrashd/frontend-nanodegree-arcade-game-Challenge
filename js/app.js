// Sets an initial player score of 0.
var score = 1;
document.getElementById('playerScore').innerHTML = score;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor((Math.random() * 512) + 256);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 460) {
        this.x = -30;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 90 && player.x + 50 > this.x && player.y < this.y + 30 && 30 + player.y > this.y) {
        player.x = 200;
        player.y = 500; {
            score = 1;
		document.getElementById('playerScore').innerHTML = score;
		player.reset();
            ///
            
            ///
            sounds[0].play();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = 200;
    this.y = 450;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 415) {
        this.x = 415;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Winnig
    if (this.y < 20) {
        this.x = 200;
        this.y = 400;
        sounds[1].play();
        
        score++;
	document.getElementById('playerScore').innerHTML = score;
	this.reset();
    }
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 80;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 80;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Position "y" where the enemies will are created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 500, 50); {
    sounds[2].play();
}
enemyPosition.forEach(function(posY) {
    var enemy = new Enemy(0, posY, 150 + Math.floor(Math.random() * 1048));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        65: 'left', //'a'
        87: 'up', //'w'
        68: 'right', //'d'
        83: 'down', //'s'
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});