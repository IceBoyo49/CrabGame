class CrabGame{
    game:Phaser.Game;
    
    constructor(){
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {preload:this.preload, create:this.create});
    }

    preload() {
        this.game.load.image('start0', "assets/start/start0.png");
        this.game.load.image('start1', "assets/start/start1.png");
        this.game.load.image('start2', "assets/start/start2.png");
        this.game.load.image('start3', "assets/start/start3.png");
        this.game.load.spritesheet('crab', "assets/crab/Crab_fullsprite.png", 320, 320, 4);
    }

    create(){
        var start0 = this.game.add.sprite(0, 0, 'start0');
        var start1 = this.game.add.sprite(0, 0, 'start1');
        var start2 = this.game.add.sprite(0, 0, 'start2');
        var start3 = this.game.add.sprite(0, 0, 'start3');

        var crab = this.game.add.sprite(this.game.world.centerX - 80, this.game.world.centerY - 40, 'crab');
        crab.scale.set(0.5, 0.5)
        var crabWalk = crab.animations.add('walk');
        crab.animations.play('walk', 4, true);

        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, null, this.startGame);

        //this.clearGrid();

    } 

    startGame(){
        console.log("START THE DAMN GAME");
        
    }

    clearGrid()
    {
        for(var i = 0; i < gridHeight; i++){
            for(var j = 0; j < gridWidth; j++){
                gameGrid[i][j] = 0;
            }
        }
    }

    createGrid(){
        //Initialize grid.
    }
}

var isStarted = false;

var startScreen;
var crabs;
var seagulls;
var player;
var gameGrid = [gridWidth][gridHeight];

var gridWidth = 31;
var gridHeight = 18;

window.onload = () => {
    var game = new CrabGame();
}