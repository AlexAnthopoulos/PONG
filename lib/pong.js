class Vec
{
    constructor (x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    get len ()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set len (value)
    {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
    }
}

class Ball extends Phaser.GameObjects.Image
{
    constructor (scene, x, y, texture)
    {
        super(scene, x, y, texture);
        this.vel = new Vec();
    }

    get left ()
    {
        return this.x - this.displayWidth / 2;
    }

    get right ()
    {
        return this.x + this.displayWidth / 2;
    }

    get top ()
    {
        return this.y - this.displayHeight / 2;
    }

    get bottom ()
    {
        return this.y + this.displayHeight / 2;
    }
}

class Player extends Phaser.GameObjects.Image
{
    constructor (scene, x, y, texture)
    {
        super(scene, x, y, texture);
        this.score = 0;
    }

    get left ()
    {
        return this.x - this.displayWidth / 2;
    }

    get right ()
    {
        return this.x + this.displayWidth / 2;
    }

    get top ()
    {
        return this.y - this.displayHeight / 2;
    }

    get bottom ()
    {
        return this.y + this.displayHeight / 2;
    }
}

class PongScene
{
    preload ()
    {
        this.load.image('ball', './assets/ball.png');
        this.load.image(`player1`,`./assets/player1.png`);
        this.load.image(`player2`,`./assets/player2.png`);
        this.load.image(`background`,`./assets/background.jpg`);
        this.load.audio("music",["./assets/sci-fi_platformer12.ogg",`./assets/sounds/sci-fi_platformer12.mp3`]);
    }

    create ()
    {
        const { width, height } = this.scale;
        const centerX = 0.5 * width;
        const centerY = 0.5 * height;
        this.background = this.add.image(602,500,`background`);
        this.players = [];
        this.players[0] = this.add.existing(new Player(this, 40, centerY, 'player1'));
        this.players[1] = this.add.existing(new Player(this, width - 40, centerY, 'player2'));
        this.ball = this.add.existing(new Ball(this, centerX, centerY, 'ball'));
        this.score = this.add.text(centerX, 40).setOrigin(0.5, 0.5);
        this.p1VictoryText = this.add.text(centerX, 300, 'Player 1 Wins!');
        this.p1VictoryText.setVisible(false);
        //this.p2VictoryText = this.add.text(centerX, 300, 'Computer Wins!').setOrigin(0.5,0.5);
        //this.p2VictoryText.setVisible(false);
        //this.p2VictoryText.setVisible(false);
        //this.music = this.sound.add("music");
        // const musicConfig = {
        //     mute: true,
        //     volume: 3,
        //     rate: 1,
        //     detune: 0,
        //     seek: 0,
        //     loop: true,
        //     delay: 0
        // }
       // this.music.play(musicConfig);
        

        this.input.on('pointermove', function (pointer)
        {
            this.players[0].y = pointer.y;
        }, this);
        this.input.on('pointerdown', function ()
        {
            this.start();
        }, this);
    }

    update (timestamp, dt)
    {
        // Convert ms to seconds
        dt *= 0.001;

        const { width, height } = this.scale;

        // Movement of the ball relative to time difference
        this.ball.x += this.ball.vel.x * dt;
        this.ball.y += this.ball.vel.y * dt;

        // Create bouncing of the ball by inverting the velocity on both x and y axis across the corners of the board
        if (this.ball.left < 0 || this.ball.right > width)
        {
        // First iteration of somehow scoring. I am using a bitwise operate to force numeric value
            const playerId = this.ball.vel.x < 0 | 0;
            this.players[playerId].score++;
            this.reset();
            console.log(playerId);
        }
        if (this.ball.top < 0 || this.ball.bottom > height)
        {
            this.ball.vel.y = -this.ball.vel.y;
        }
        // Player 2 always follow the ball
        this.players[1].y = this.ball.y - 2;
        // Update collision here for players
        this.players.forEach(player => this.collision(player, this.ball));
        // Show score
        this.score.setText(`${this.players[0].score} — ${this.players[1].score}`);
        if(this.players[0].score === 7  ){
            this.p1VictoryText.setVisible(true);
            
            
        }
        else if(this.players[1].score === 7){
            //this.p2VictoryText.setVisible(true);
            this.scene.launch('ModalText', { x:400, y: 300, "scene":this }, {"scene":this});
            this.scene.pause();
            this.input.on('pointerdown', function (event) {
              
                // let restart= this.scene.get('PongScene')
                // PongScene.scene.restart();
    
            }, this);
        
        
            
        }
    }

    collision (player, ball)
    {
        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top)
        {
        // Aim for randomness as well on y axis
        // Saving current ball velocity
            const len = ball.vel.len;
            // Negate the vertical ball velocity
            ball.vel.x = -ball.vel.x;
            // Adding here the effect of ball collision. The more times the ball hits the faster it becomes
            // Replace the length but increase by 5%
            ball.vel.len = len * 1.05;
            // Randomness of ball on y axis
            // Fudging velocity
            ball.vel.y += 400 * (Math.random() - 0.5);
        }
    }  
    reset ()
    {
        this.ball.x = this.scale.width / 2;
        this.ball.y = this.scale.height / 2;
        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
    }

    start ()
    {
        if (this.ball.vel.x === 0 && this.ball.vel.y === 0)
        {
        // Ball always starts on same player so randomizing positions and start values so it is random where ball goes
            this.ball.vel.x = 800 * (Math.random() > 0.5 ? 1 : -1);
            this.ball.vel.y = 500 * (Math.random() * 2 - 1);
            // Ball speed
            this.ball.vel.len = 900;
        }
    }
    
}
class ModalText extends Phaser.Scene {

    constructor (config)
    {
        super({ key: 'ModalText' });
    }
  
    init(config) {
      console.log(config, config.scene);
      this.parentScene = config.scene;
    }

    preload ()
    {
        //test
    }

    create (data)
    {
      
        const { width, height } = this.scale;
        const centerX = 0.5 * width;
        const centerY = 0.5 * height;
        let text = this.add.text(centerX, 300, 'Computer Wins!');
        text.x = text.x - text.displayWidth*0.5;
      
       this.input.on('pointerdown', function (event) {
           
           this.scene.start("PongScene");
           this.parentScene.scene.restart();
        }, this);
        this.scene.bringToTop();
        
    }

}


const game = new Phaser.Game({
    scale: {
        
        parent: 'mygame',
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
    width: 1200,
    height: 800,
    scene: [PongScene,ModalText]
    
});
