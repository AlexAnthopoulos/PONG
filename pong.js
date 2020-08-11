let game = new Phaser.Game(1200,800,Phaser.AUTO,``,{preload : preload, create: create, update: update});

function preload(){
    game.load.image('paddle','assets/paddle.png')
}

function create(){

}

function update(){

}


function create_paddle(x,y){
    let paddle = game.add.sprite(x,y,`paddle`);
    paddle.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    return paddle;
}