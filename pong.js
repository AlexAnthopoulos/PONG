let game = new Phaser.Game(1200,800,Phaser.AUTO,``,{preload : preload, create: create, update: update});

let paddle1;
let paddle2;

function preload(){
    game.load.image('paddle','assets/paddle.png')
}

function create(){
    paddle1 = create_paddle(0,game.world.centerY)
    paddle2 = create_paddle(game.world.width - 16, game.world.centerY)
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

function control_paddle(paddle,y){
    paddle.y = y;
    if(paddle.y < paddle.height / 2){
        paddle.y = paddle.height / 2;
    } else if (paddle.y > game.world.height - paddle.height / 2 ){
        paddle.y = game.world.height - paddle.height / 2;
    }
}