var CrabGame = /** @class */ (function () {
    function CrabGame() {
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    CrabGame.prototype.preload = function () {
        //this.game.load.image("logo", "assets/ds_logo.png");
        this.game.stage.backgroundColor = 0xB20059;
    };
    CrabGame.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    };
    return CrabGame;
}());
window.onload = function () {
    var game = new CrabGame();
};
