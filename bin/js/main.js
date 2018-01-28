var CrabGame = /** @class */ (function () {
    function CrabGame() {
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    CrabGame.prototype.preload = function () {
        this.game.load.image('start0', "assets/start/start0.png");
        this.game.load.image('start1', "assets/start/start1.png");
        this.game.load.image('start2', "assets/start/start2.png");
        this.game.load.image('start3', "assets/start/start3.png");
        this.game.load.spritesheet('crab', "assets/crab/Crab_fullsprite.png", 320, 320, 4);
    };
    CrabGame.prototype.create = function () {
        var start0 = this.game.add.sprite(0, 0, 'start0');
        var start1 = this.game.add.sprite(0, 0, 'start1');
        var start2 = this.game.add.sprite(0, 0, 'start2');
        var start3 = this.game.add.sprite(0, 0, 'start3');
        var crab = this.game.add.sprite(this.game.world.centerX - 80, this.game.world.centerY - 40, 'crab');
        crab.scale.set(0.5, 0.5);
        var crabWalk = crab.animations.add('walk');
        crab.animations.play('walk', 4, true);
        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, null, this.startGame);
        //this.clearGrid();
    };
    CrabGame.prototype.startGame = function () {
        console.log("START THE DAMN GAME");
    };
    CrabGame.prototype.clearGrid = function () {
        for (var i = 0; i < gridHeight; i++) {
            for (var j = 0; j < gridWidth; j++) {
                gameGrid[i][j] = 0;
            }
        }
    };
    CrabGame.prototype.createGrid = function () {
        //Initialize grid.
    };
    return CrabGame;
}());
var isStarted = false;
var startScreen;
var crabs;
var seagulls;
var player;
var gameGrid = [gridWidth][gridHeight];
var gridWidth = 31;
var gridHeight = 18;
window.onload = function () {
    var game = new CrabGame();
};
var StartScreen = /** @class */ (function () {
    function StartScreen() {
    }
    return StartScreen;
}());
