class Vec
{
    constructor(x = 0 , y = 0)
    {
        this.x = x;
        this.y = y;
    }
    //As we want to improve velocity we are going to find the hypothenus of the virtual triangle.
    get len()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y) ;
    }
    set len(value)
    {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
    }
}

class Rect
{
    constructor(w,h)
    {
        this.pos = new Vec;
        this.size = new Vec(w,h);
    }
    //Getting different sides of the ball to make more accessible when it comes down to calculating bounces across the x and y axis.
    get left()
    {
        return this.pos.x - this.size.x / 2;
    }
    get right()
    {
        return this.pos.x + this.size.x / 2;
    }
    get top()
    {
        return this.pos.y - this.size.y / 2;
    }
    get bottom()
    {
        return this.pos.y + this.size.y / 2;
    }
}

class Player extends Rect
{
    constructor()
    {
        super(20,100);
        this.score = 0;
    }
}

class Ball extends Rect
{
    constructor()
    {
        super(10,10);
        this.vel = new Vec
    }
}

class Pong  
{
    constructor(canvas)
    {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this.ball = new Ball;
        
        this.players = [
            new Player,
            new Player,
        ];
        this.players[0].pos.x = 40;
        this.players[1].pos.x = this._canvas.width - 40;
        this.players.forEach(player => {
            player.pos.y = this._canvas.height /2 ;
        })
        //Creating animation update for the page
        let lastUpdate;

        const callback = (milliseconds) => {
            if(lastUpdate) {
                //Update in seconds for easier changes
                this.update((milliseconds - lastUpdate)/1000);
            }
            //Doing this so we add on the animation frame the callback
            lastUpdate = milliseconds;
            requestAnimationFrame(callback);
        };
            callback();
            // Important to visualize.Numbers are split in 0 and 1. O on the board being black, one being white space. Will do an array as array's are 0 based and go from there as we 
            // will eventually loop inside it for the numbers to appear. The aim is to ''cache'' canvasses in the beginning of the game and take it from there. We are going to split
            //the strings of the array and for each one of the we will eventually paint white.
            // 0 to 7
            this.CHAR_PIXEL = 10;
            this.CHARS = [
                '111101101101111',
                '010010010010010',
                '111001111100111',
                '111001111001111',
                '101101111001001',
                '111100111001111',
                '111100111101111',
                '111001001001001',
                '111101111101111',
                '111101111001111',
            ].map(str => {
                const canvas = document.createElement('canvas');
                canvas.height = this.CHAR_PIXEL * 5;
                canvas.width = this.CHAR_PIXEL * 3;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = `#fff`;
                //Entering the loop. We will split into strings everything and then every time 1 appears paint white
                str.split('').forEach((fill, i) => {
                    if (fill === '1') {
                        //Every ''pixel line we got is 3 pixels wide
                        ctx.fillRect((i % 3) * this.CHAR_PIXEL,(i / 3 | 0) * this.CHAR_PIXEL, this.CHAR_PIXEL,this.CHAR_PIXEL);
                    }
                });
                return canvas
            });
            this.reset();
    }
    collision(player,ball)
    {
        if(player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
            //Aim for randomness as well on y axis
            //Saving current ball velocity
            const len = ball.vel.len;
            //Negate the vertical ball velocity
            ball.vel.x = -ball.vel.x;
            //Adding here the effect of ball collision. The more times the ball hits the faster it becomes
            //Replace the length but increase by 5%
            ball.vel.len = len * 1.05;
            //Randomness of ball on y axis
            //Fudging velocity
            ball.vel.y  +=400 * (Math.random() - .5);
        }
    }
    draw()
    {
         //Create board stuff
         this._ctx.fillStyle = '#000';
         this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height);
         //call the ball creation
         this.drawRect(this.ball);
         this.players.forEach(player => this.drawRect(player));
         this.drawScore();
    }
    drawRect(rect) 
    {
          //Create the ball
          this._ctx.fillStyle = '#fff';
          this._ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
    drawScore()
    { // I will divide the whole canvas into 3 equal squares and put the score in the middle one
        const alignment = this._canvas.width / 3;
        // Here I will create the drawing but first will make the width. As we know the pixel of each number is 3 so will give an extra space for padding.
        const CHAR_Width = this.CHAR_PIXEL * 4;
        //Loop through each player and convert the score into characters.
        this.players.forEach((player, index) => {
            //Make the number a string and then split it as want it as an array 
            const chars = player.score.toString().split('');
            //Creating an offset from X. Multiple sources have contributed for this such as StackOverflock,Discord Channels(Programmers Hangout,SpeakJS) and checking
            //projects and tutorials online over offsetting array of digits for scoring.
            const offset = alignment * (index + 1) -(CHAR_Width * chars.length / 2) * this.CHAR_PIXEL / 2;
            chars.forEach((char, pos) => {
                //Paint on the canvas according to Chars provided earlier. We use the ''pipe'' Byte operator to floor and type it into integer
                this._ctx.drawImage(this.CHARS[char|0], offset + pos * CHAR_Width);
            });
        });
    }
    reset()
    {
        this.ball.pos.x = this._canvas.width / 2;
        this.ball.pos.y = this._canvas.height / 2;
        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
    }
    start()
    {
        if (this.ball.vel.x === 0 && this.ball.vel.y === 0) {
            //Ball always starts on same player so randomizing positions and start values so it is random where ball goes
            this.ball.vel.x = 800 * (Math.random() > .5 ? 1 : -1);
            this.ball.vel.y = 500 * (Math.random() * 2  -1)
            //Ball speed
            this.ball.vel.len = 900;
        }
    }
    update(dt){
        //Movement of the ball relative to time difference
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;
        
        //Create bouncing of the ball by inverting the velocity on both x and y axis across the corners of the board
        if(this.ball.left < 0 || this.ball.right > this._canvas.width){
            //First iteration of somehow scoring. I am using a bitwise operate to force numeric value
            const playerId = this.ball.vel.x < 0 | 0;
            this.players[playerId].score++
            this.reset();
            console.log(playerId)
            /* Another version of writing the above can also be the following :
            let playerId;
            if(this.ball.vel.x < 0) {
                playerId = 1;
            } else {
                playerId = 0;
            }
            console.log(playerId); */
        }
        if(this.ball.top < 0 || this.ball.bottom > this._canvas.height){
            this.ball.vel.y = -this.ball.vel.y;
        }
           //Player 2 always follow the ball
           this.players[1].pos.y = this.ball.pos.y
           //Update collision here for players
            this.players.forEach(player => this.collision(player,this.ball));
           this.draw();
    }
}

//Draw main gaming area and get canvas elements
const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
    pong.players[0].pos.y = event.offsetY
});

canvas.addEventListener('click', event => {
    pong.start();
});
