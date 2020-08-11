class Vec
{
    constructor(x = 0 , y = 0)
    {
        this.x = x;
        this.y = y;
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
        this.ball.pos.x = 100;
        this.ball.pos.y = 50
        this.ball.vel.x = 900;
        this.ball.vel.y = 800;
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
    }
    draw()
    {
         //Create board stuff
         this._ctx.fillStyle = '#000';
         this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height);
         //call the ball creation
         this.drawRect(this.ball);
         this.players.forEach(player => this.drawRect(player));
    }
    drawRect(rect) 
    {
          //Create the ball
          this._ctx.fillStyle = '#fff';
          this._ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
    update(dt){
        //Movement of the ball relative to time difference
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;
        
        //Create bouncing of the ball by inverting the velocity on both x and y axis across the corners of the board
        if(this.ball.left < 0 || this.ball.right > this._canvas.width){
            this.ball.vel.x = -this.ball.vel.x;
        }
        if(this.ball.top < 0 || this.ball.bottom > this._canvas.height){
            this.ball.vel.y = -this.ball.vel.y;
        }
           //Player 2 always follow the ball
           this.players[1].pos.y = this.ball.pos.y
           this.draw();
    }
}

//Draw main gaming area and get canvas elements
const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
    pong.players[0].pos.y = event.offsetY
});


