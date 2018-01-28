var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'Crab Game', { preload: preload, create: create, update: update, render: render });
function preload() {
    game.load.image('start0', "assets/start/start0.png");
    game.load.image('start1', "assets/start/start1.png");
    game.load.image('button', "assets/start/button.png");
    game.load.image('start3', "assets/start/start3.png");
    game.load.image('background', "assets/background.png");
    game.load.image('city', "assets/city.png");
    game.load.spritesheet('crab', "assets/crab/Crab_fullsprite.png", 320, 320, 4);
    game.stage.backgroundColor = "0x9090ff";
    game.load.spritesheet('scientist', "assets/scientist/spritesheet.png", 310, 310, 4);
    game.load.spritesheet('octopus', "assets/octopus/spritesheet.png", 310, 310, 4);
    game.load.spritesheet('seagull', "assets/seagull/seagull.png", 320, 320, 2);
    game.load.spritesheet('barrel', "assets/toxic/radioactive_barrel.png", 320, 320, 4);
    game.load.audio('background', "assets/sounds/Mushroom Cloud Layin Motherfucker (Music).wav");
    game.load.audio('win', "assets/sounds/Sounds/youwin.wav");
    game.load.audio('dead', "assets/sounds/Sounds/dead.wav");
    game.load.video('intro', "assets/video/Scientist.mp4");
    game.load.image('credits0', "assets/credits/credits0.png");
    game.load.image('credits1', "assets/credits/credits1.png");
    game.load.image('credits2', "assets/credits/credits2.png");
    game.load.image('credits3', "assets/credits/credits3.png");
}
function create() {
    setUpStartScreen();
    introVideo = game.add.video('intro');
    introVideo.addToWorld(0, 0);
    introVideo.play();
    introVideo.volume = 0;
    introVideo.onComplete.addOnce(destroyVideo, this);
    backgroundMusic = game.add.audio('background');
    winSound = game.add.audio('win');
    deadSound = game.add.audio('dead');
    game.sound.setDecodedCallback([backgroundMusic, winSound], soundsReady, this);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(moveUp);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(moveDown);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(moveLeft);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(moveRight);
}
function destroyVideo() {
    introVideo.destroy();
    setUpStartScreen();
}
function update() {
    if (!isStarted) {
        return;
    }
    seagullSpawnTimer -= 1;
    if (seagullSpawnTimer < 0) {
        spawnSeagull();
        seagullSpawnTimer = game.rnd.integerInRange(200, 400);
    }
    moveSeagulls();
    moveOctopi();
}
function soundsReady() {
    backgroundMusic.play();
}
function render() {
    for (var i = 0; i < gridHeight + gridWidth; i++) {
        game.debug.geom(lines[i]);
    }
}
function checkForRadiation(location) {
    if (location == 4) {
        gameOver();
    }
}
function checkForCrab(location) {
    if (location == 2) {
        return true;
    }
    return false;
}
function moveUp() {
    if (playerLocation.y - 1 < 0) {
        return;
    }
    var newSpace = gameGrid[playerLocation.x][playerLocation.y - 1];
    var newLocation = new Phaser.Point(playerLocation.x, playerLocation.y - 1);
    if (newSpace == 3) {
        gameOver();
    }
    checkForRadiation(newSpace);
    if (checkForCrab(newSpace)) {
        var index = findCrab(newLocation);
        var crabSprite = crabGroup.children[index];
        crabSprite.destroy();
        crabs.splice(index, 1);
        crabCount--;
        checkForWin();
    }
    gameGrid[playerLocation.x][playerLocation.y] = 0;
    gameGrid[playerLocation.x][playerLocation.y - 1] = 1;
    playerLocation.y -= 1;
    player.y = tileSize * playerLocation.y;
}
function winScreen() {
    game.add.sprite(0, 0, 'city');
    setTimeout(function () {
        gameOver();
    }, 5000);
}
function checkForWin() {
    if (crabCount <= 0) {
        winSound.play();
        winScreen();
        //gameOver();
    }
}
function findCrab(location) {
    for (var i = 0; i < crabCount; i++) {
        if (crabs[i].x == location.x && crabs[i].y == location.y) {
            return i;
        }
    }
    return -1;
}
function moveDown() {
    if (playerLocation.y >= gridHeight) {
        return;
    }
    var newSpace = gameGrid[playerLocation.x][playerLocation.y + 1];
    var newLocation = new Phaser.Point(playerLocation.x, playerLocation.y + 1);
    if (newSpace == 3) {
        gameOver();
    }
    checkForRadiation(newSpace);
    if (checkForCrab(newSpace)) {
        var index = findCrab(newLocation);
        var crabSprite = crabGroup.children[index];
        crabSprite.destroy();
        crabs.splice(index, 1);
        crabCount--;
        checkForWin();
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
    var newLocation = new Phaser.Point(playerLocation.x - 1, playerLocation.y);
    if (newSpace == 3) {
        gameOver();
    }
    checkForRadiation(newSpace);
    if (checkForCrab(newSpace)) {
        var index = findCrab(newLocation);
        var crabSprite = crabGroup.children[index];
        crabSprite.destroy();
        crabs.splice(index, 1);
        crabCount--;
        checkForWin();
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
    var newLocation = new Phaser.Point(playerLocation.x + 1, playerLocation.y);
    if (newSpace == 3) {
        gameOver();
    }
    checkForRadiation(newSpace);
    if (checkForCrab(newSpace)) {
        var index = findCrab(newLocation);
        var crabSprite = crabGroup.children[index];
        crabSprite.destroy();
        crabs.splice(index, 1);
        crabCount--;
        checkForWin();
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
function loadCredits() {
    creditScreen = game.add.group();
    creditScreen.create(0, 0, 'credits0');
    creditScreen.create(0, 0, 'credits1');
    creditScreen.create(0, 0, 'credits2');
    creditScreen.create(0, 0, 'credits3');
}
function gameOver() {
    player.destroy();
    deadSound.play();
    isStarted = false;
    game.world.remove(crabGroup);
    game.world.remove(seagullGroup);
    game.world.remove(octopusGroup);
    loadCredits();
}
function startGame() {
    introVideo.stop();
    introVideo.destroy();
    createGrid();
    isStarted = true;
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
    //drawLines();
    placeBarrels();
    placeScientist();
    placeCrabs();
    placeOctopi();
    seagullGroup = game.add.group();
}
function placeScientist() {
    var background = game.add.sprite(0, 0, 'background');
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
function placeBarrels() {
    for (var i = 0; i < 4; i++) {
        var location = findRandomSpot();
        var barrel = game.add.sprite(tileSize * location.x, tileSize * location.y, 'barrel');
        barrel.scale.set(0.25, 0.25);
        var barrelSeep = barrel.animations.add('seep');
        barrel.animations.play('seep', 4, true);
        gameGrid[location.x][location.y] = 4;
    }
}
function spawnSeagull() {
    seagullCount++;
    var randomX = game.rnd.integerInRange(0, gridWidth - 1);
    var seagull = seagullGroup.create(tileSize * randomX, (720 - tileSize), 'seagull');
    seagull.scale.set(0.25, 0.25);
    var seagullFly = seagull.animations.add('fly');
    seagull.animations.play('fly', 4, true);
    seagulls[seagullCount - 1] = new Phaser.Point(randomX, gridHeight - 1);
    seagullMovementTimers[seagullCount - 1] = 30;
}
function moveSeagulls() {
    for (var i = 0; i < seagullCount; i++) {
        seagullMovementTimers[i]--;
        if (seagullMovementTimers[i] < 0) {
            seagullMovementTimers[i] = 30;
            var newSpace = gameGrid[seagulls[i].x, seagulls[i].y - 1];
            var seagullSprite = seagullGroup.children[i];
            if (seagulls[i].y - 1 < 0) {
                seagulls.splice(i, 1);
                seagullMovementTimers.splice(i, 1);
                seagullCount--;
                seagullSprite.destroy();
                return;
            }
            else {
                seagullSprite.y -= tileSize;
                seagulls[i].y -= 1;
            }
            if (gameGrid[seagulls[i].x][seagulls[i].y] == 1) {
                gameOver();
            }
        }
    }
}
function moveOctopi() {
    for (var i = 0; i < octopusCount; i++) {
        octopusMovementTimers[i]--;
        if (octopusMovementTimers[i] <= 0) {
            if (checkForPlayer(octopi[i])) {
                gameOver();
                return;
            }
            octopusMovementTimers[i] = game.rnd.integerInRange(60, 240);
            var newPoint = findOpenSpace(octopi[i]);
            var octoSprite = octopusGroup.children[i];
            octoSprite.x = newPoint.x * tileSize;
            octoSprite.y = newPoint.y * tileSize;
            gameGrid[octopi[i].x][octopi[i].y] = 0;
            gameGrid[newPoint.x][newPoint.y] = 3;
            octopi[i] = newPoint;
        }
    }
}
function checkForPlayer(centerPoint) {
    var left = 0;
    var right = 0;
    var up = 0;
    var down = 0;
    if (centerPoint.x - 1 >= 0) {
        left = gameGrid[centerPoint.x - 1][centerPoint.y];
    }
    if (centerPoint.x + 1 < gridWidth) {
        right = gameGrid[centerPoint.x + 1][centerPoint.y];
    }
    if (centerPoint.y - 1 >= 0) {
        up = gameGrid[centerPoint.x][centerPoint.y - 1];
    }
    if (centerPoint.y + 1 < gridHeight) {
        down = gameGrid[centerPoint.x][centerPoint.y + 1];
    }
    if (left == 1 || right == 1 || up == 1 || down == 1) {
        return true;
    }
    return false;
}
function findOpenSpace(point) {
    var direction = game.rnd.integerInRange(0, 3);
    var newPoint = new Phaser.Point(point.x, point.y);
    if (direction == 0) {
        newPoint.y--;
    }
    else if (direction == 1) {
        newPoint.x++;
    }
    else if (direction == 2) {
        newPoint.y++;
    }
    else if (direction == 3) {
        newPoint.x--;
    }
    if (newPoint.x >= gridWidth || newPoint.x < 0) {
        return point;
    }
    if (newPoint.y >= gridHeight || newPoint.y < 0) {
        return point;
    }
    if (gameGrid[newPoint.x][newPoint.y] != 0) {
        return point;
    }
    return newPoint;
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
        octopusMovementTimers[i] = 120;
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
var creditScreen;
var button;
var backgroundMusic;
var winSound;
var deadSound;
var introVideo;
var cityScreen;
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
var octopusMovementTimers = [];
var seagulls = [];
var seagullMovementTimers = [];
var seagullGroup;
var seagullSpawnTimer = 120;
var seagullCount = 0;
var player;
var playerLocation;
var gameGrid = [];
var lines = [];
var gridWidth = 16;
var gridHeight = 9;
var tileSize = 80;
var victory = false;
var StartScreen = /** @class */ (function () {
    function StartScreen() {
    }
    return StartScreen;
}());
