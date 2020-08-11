const config = {
    type:Phaser.AUTO,
    parent: `game`,
    width: 1200,
    height :800,    
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
let player1;
let player2;

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
    player1 = this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
        'paddle'
    )
    player2 = this.physics.add.sprite(
        ball.body.width / 2 + 1,
        this.physics.world.bounds.height / 2,
        'paddle'
    )
}

function update(){

}