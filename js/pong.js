const config = {
    type:Phaser.AUTO,
    parent: `game`,
    width: 1200,
    height :800,
    scale: {
        mode:Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.Center_BOTH
    },
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
}

const game = new Phaser.Game(config);
let ball;

function preload() {
    this.load.image(`ball`,`../assets/ball.png`);
    this.load.image(`paddle`,`../assets/paddle.png`);
}

function create(){
    ball = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'ball'
    )
}

function update(){

}