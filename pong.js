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
}

class Ball extends Rect
{
    constructor()
    {
        super(10,10);
        this.vel = new Vec
    }
}
//Draw main gaming area and get canvas elements
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');


const ball = new Ball;
console.log(ball);
ball.pos.x = 100;
ball.pos.y = 50

//Updating ball position
function update(dt){
    //Movement of the ball relative to time difference
    ball.pos.x += ball.vel.x * dt;
    ball.pos.y += ball.vel.y * dt;
    //Create board stuff
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //Create the ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

