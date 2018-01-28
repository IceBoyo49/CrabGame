var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'Crab Game', { preload: preload, create: create, update: update, render: render });
function preload() {
    game.load.image('start0', "assets/start/start0.png");
    game.load.image('start1', "assets/start/start1.png");
    game.load.image('button', "assets/start/button.png");
    game.load.image('start3', "assets/start/start3.png");
    game.load.spritesheet('crab', "assets/crab/Crab_fullsprite.png", 320, 320, 4);
    game.stage.backgroundColor = "0x9090ff";
    game.load.spritesheet('scientist', "assets/scientist/spritesheet.png", 310, 310, 4);
    game.load.spritesheet('octopus', "assets/octopus/spritesheet.png", 310, 310, 4);
}
function create() {
    setUpStartScreen();
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(moveUp);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(moveDown);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(moveLeft);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(moveRight);
}
function update() {
}
function render() {
    for (var i = 0; i < gridHeight + gridWidth; i++) {
        game.debug.geom(lines[i]);
    }
}
function moveUp() {
    if (playerLocation.y - 1 < 0) {
        return;
    }
    var newSpace = gameGrid[playerLocation.x][playerLocation.y - 1];
    if (newSpace != 0) {
        return;
    }
    gameGrid[playerLocation.x][playerLocation.y] = 0;
    gameGrid[playerLocation.x][playerLocation.y - 1] = 1;
    playerLocation.y -= 1;
    player.y = tileSize * playerLocation.y;
}
function moveDown() {
    if (playerLocation.y >= gridHeight) {
        return;
    }
    var newSpace = gameGrid[playerLocation.x][playerLocation.y + 1];
    if (newSpace != 0) {
        return;
    }
    gameGrid[playerLocation.x][playerLocation.y] = 0;
    gameGrid[playerLocation.x][playerLocation.y + 1] = 1;
    playerLocation.y += 1;
    player.y = tileSize * playerLocation.y;
}
function moveLeft() {
    if (playerLocation.x - 1 < 0) {
        return;
    }
    var newSpace = gameGrid[playerLocation.x - 1][playerLocation.y];
    if (newSpace != 0) {
        return;
    }
    gameGrid[playerLocation.x][playerLocation.y] = 0;
    gameGrid[playerLocation.x - 1][playerLocation.y] = 1;
    playerLocation.x -= 1;
    player.x = tileSize * playerLocation.x;
}
function moveRight() {
    if (playerLocation.x + 1 >= gridWidth) {
        return;
    }
    var newSpace = gameGrid[playerLocation.x + 1][playerLocation.y];
    if (newSpace != 0) {
        return;
    }
    gameGrid[playerLocation.x][playerLocation.y] = 0;
    gameGrid[playerLocation.x + 1][playerLocation.y] = 1;
    playerLocation.x += 1;
    player.x = tileSize * playerLocation.x;
}
function setUpStartScreen() {
    startScreen = game.add.group();
    startScreen.create(0, 0, 'start0');
    startScreen.create(0, 0, 'start1');
    button = game.make.button(game.world.centerX - 230, game.world.centerY + 165, 'button', startGame);
    startScreen.add(button);
    startScreen.create(0, 0, 'start3');
    var crab = startScreen.create(game.world.centerX - 80, game.world.centerY - 40, 'crab');
    crab.scale.set(0.5, 0.5);
    var crabWalk = crab.animations.add('walk');
    crab.animations.play('walk', 4, true);
}
function startGame() {
    createGrid();
    game.world.remove(startScreen);
    button.inputEnabled = false;
}
function clearGrid() {
    gameGrid = [];
    for (var i = 0; i < gridWidth; i++) {
        gameGrid[i] = [];
        for (var j = 0; j < gridHeight; j++) {
            gameGrid[i][j] = 0;
        }
    }
}
function createGrid() {
    clearGrid();
    drawLines();
    placeScientist();
    placeCrabs();
    placeOctopi();
}
function placeScientist() {
    player = game.add.sprite(0, (tileSize * (gridHeight - 1)), 'scientist');
    gameGrid[0][gridHeight - 1] = 1;
    player.scale.set(0.25, 0.25);
    playerLocation = new Phaser.Point(0, (gridHeight - 1));
    var playerWalk = player.animations.add('walk');
    player.animations.play('walk', 6, true);
}
function placeCrabs() {
    crabGroup = game.add.group();
    for (var i = 0; i < crabCount; i++) {
        var location = findRandomSpot();
        gameGrid[location.x][location.y] = 2;
        crabs[i] = location;
        var crab = crabGroup.create(tileSize * crabs[i].x, tileSize * crabs[i].y, 'crab');
        crab.scale.set(0.25, 0.25);
        var crabWalk = crab.animations.add('walk');
        crab.animations.play('walk', 4, true);
    }
}
function placeOctopi() {
    octopusGroup = game.add.group();
    for (var i = 0; i < octopusCount; i++) {
        var location = findRandomSpot();
        gameGrid[location.x][location.y] = 3;
        octopi[i] = location;
        var octopus = octopusGroup.create(tileSize * octopi[i].x, tileSize * octopi[i].y, 'octopus');
        octopus.scale.set(0.25, 0.25);
        var octopusWalk = octopus.animations.add('walk');
        octopus.animations.play('walk', 8, true);
    }
}
function findRandomSpot() {
    var crabX = game.rnd.integerInRange(4, (gridWidth - 1));
    var crabY = game.rnd.integerInRange(0, (gridHeight - 5));
    var occupied = gameGrid[crabX][crabY];
    if (occupied != 0) {
        return findRandomSpot();
    }
    else {
        return new Phaser.Point(crabX, crabY);
    }
}
function drawLines() {
    for (var i = 0; i < gridWidth; i++) {
        lines[i] = new Phaser.Line(1280 - (i * tileSize), 0, 1280 - (i * tileSize), 720);
    }
    for (var j = 0; j < gridHeight; j++) {
        lines[j + gridWidth] = new Phaser.Line(0, 720 - (j * tileSize), 1280, 720 - (j * tileSize));
    }
}
var isStarted = false;
var startScreen;
var button;
var upKey;
var downKey;
var leftKey;
var rightKey;
var crabs = [];
var crabCount = 4;
var crabGroup;
var octopi = [];
var octopusCount = 4;
var octopusGroup;
var seagulls = [];
var seagullGroup;
var player;
var playerLocation;
var gameGrid = [];
var lines = [];
var gridWidth = 16;
var gridHeight = 9;
var tileSize = 80;
var StartScreen = /** @class */ (function () {
    function StartScreen() {
    }
    return StartScreen;
}());
