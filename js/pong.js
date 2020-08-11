

const config = {
    type:Phaser.AUTO,
    parent: `game`,
    width: 1200,
    height :800,
    scale: {
        mode:Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.Center_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
}

const game = new Phaser.Game(config);