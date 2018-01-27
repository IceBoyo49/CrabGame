class CrabGame{
    game:Phaser.Game;

    constructor(){
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {preload:this.preload, create:this.create});
    }

    preload() {
        //this.game.load.image("logo", "assets/ds_logo.png");
        this.game.stage.backgroundColor = 0xB20059;
    }

    create(){
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    }
}

window.onload = () => {
    var game = new CrabGame();
}